import { execFile, spawn, type ChildProcessWithoutNullStreams } from "node:child_process";

// Runs one program at a time with the system Node, and reports its output as it arrives.

export type RunEvent =
  | { kind: "stdout" | "stderr" | "status"; text: string }
  | { kind: "done"; code: number | null; timedOut: boolean };

export const DEFAULT_TIMEOUT_MS = 10_000;

// The environment a student's program gets. Node needs the search path and, on Windows, SystemRoot; the rest is left
// out, so the program doesn't inherit the runner's settings.
function childEnvironment(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const name of ["PATH", "Path", "SystemRoot", "TEMP", "TMP", "USERPROFILE"]) {
    const value = process.env[name];
    if (value !== undefined) {
      env[name] = value;
    }
  }
  return env;
}

// Returns the major version of the node on PATH, or undefined when it can't be run.
export function nodeMajorVersion(): Promise<number | undefined> {
  return new Promise((resolve) => {
    execFile("node", ["--version"], { windowsHide: true }, (error, stdout) => {
      if (error !== null) {
        resolve(undefined);
        return;
      }
      const match = /^v(\d+)\./.exec(stdout.trim());
      resolve(match === null ? undefined : Number(match[1]));
    });
  });
}

export class RunSession {
  private child: ChildProcessWithoutNullStreams | undefined;
  private timer: NodeJS.Timeout | undefined;
  private timedOut = false;
  private readonly onEvent: (event: RunEvent) => void;
  private readonly timeoutMs: number;

  constructor(onEvent: (event: RunEvent) => void, timeoutMs: number = DEFAULT_TIMEOUT_MS) {
    this.onEvent = onEvent;
    this.timeoutMs = timeoutMs;
  }

  get running(): boolean {
    return this.child !== undefined;
  }

  start(file: string, cwd: string): void {
    if (this.child !== undefined) {
      throw new Error("A program is already running. Stop it before you run another.");
    }
    this.timedOut = false;
    const child = spawn("node", [file], { cwd, env: childEnvironment(), windowsHide: true });
    this.child = child;

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (text: string) => this.onEvent({ kind: "stdout", text }));
    child.stderr.on("data", (text: string) => this.onEvent({ kind: "stderr", text }));

    this.timer = setTimeout(() => {
      this.timedOut = true;
      this.onEvent({ kind: "status", text: `Stopped: the program ran for more than ${this.timeoutMs / 1000} seconds.` });
      child.kill();
    }, this.timeoutMs);

    child.on("error", (err) => {
      this.onEvent({ kind: "stderr", text: `Could not start node: ${err.message}\n` });
    });
    child.on("close", (code) => {
      clearTimeout(this.timer);
      this.timer = undefined;
      this.child = undefined;
      this.onEvent({ kind: "done", code, timedOut: this.timedOut });
    });
  }

  // Sends one line to the program's input. Does nothing when no program is running.
  write(line: string): void {
    this.child?.stdin.write(`${line}\n`);
  }

  stop(): void {
    this.child?.kill();
  }
}
