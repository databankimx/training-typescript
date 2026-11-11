import ts from "typescript";
import { dirname, resolve } from "node:path";

// Type-checks one file with the course's tsconfig.json, the same settings VS Code and npm run check use. Only the
// diagnostics for that file are returned, with 1-based line and column numbers.

export interface Diagnostic {
  line: number;
  column: number;
  message: string;
}

export function checkFile(file: string, tsconfigPath: string): Diagnostic[] {
  const config = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (config.error !== undefined) {
    throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, "\n"));
  }
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, dirname(tsconfigPath));
  const program = ts.createProgram([file], { ...parsed.options, noEmit: true });
  const target = resolve(file);

  const results: Diagnostic[] = [];
  for (const diagnostic of ts.getPreEmitDiagnostics(program)) {
    if (diagnostic.file === undefined) {
      continue;
    }
    if (resolve(diagnostic.file.fileName) !== target || diagnostic.start === undefined) {
      continue;
    }
    const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    results.push({
      line: position.line + 1,
      column: position.character + 1,
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
    });
  }
  return results;
}
