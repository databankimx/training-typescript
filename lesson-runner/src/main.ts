import { app, BrowserWindow, ipcMain, Menu, shell, type WebContents } from "electron";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { checkFile, type Diagnostic } from "./core/check.ts";
import { loadParts, chapterTitle, type Chapter, type Lesson, type Part } from "./core/catalog.ts";
import { highlightCode } from "./core/highlight.ts";
import { createLessonMarkdown } from "./core/markdown.ts";
import { nodeMajorVersion, RunSession, type RunEvent } from "./core/run.ts";
import { cleanWorkspaceSync, listCodeFiles, prepareWorkspace } from "./core/workspace.ts";
import { transpileForBrowser } from "./core/page.ts";
import { parseState, serialiseState, emptyState, type AppState } from "./core/state.ts";

// The compiled file lives in lesson-runner/dist, so the course root is two folders up.
const here = dirname(fileURLToPath(import.meta.url));
const courseRoot = join(here, "..", "..");
const tsconfigPath = join(courseRoot, "tsconfig.json");
const markdown = createLessonMarkdown();

// The window icon is the blue DataBank D, as a PNG, when the build has created it.
const windowIcon = join(here, "renderer", "app.png");

// The pop-out opens a little smaller than the main window, so the two sit comfortably side by side.
const MAIN_SIZE = { width: 1200, height: 800 };
const POPOUT_SIZE = { width: 960, height: 680 };

export interface LessonSummary {
  id: string;
  title: string;
  minutes: number;
  homework: boolean;
}

export interface ChapterSummary {
  name: string;
  lessons: LessonSummary[];
}

export interface PartSummary {
  title: string;
  chapters: ChapterSummary[];
}

// What the window shows for a step or a chapter introduction. A chapter introduction has no code, so it isn't runnable.
export interface LessonView {
  id: string;
  kind: "step" | "chapter";
  title: string;
  objective: string;
  minutes: number;
  homework: boolean;
  runnable: boolean;
  html: string;
  markdown: string;
  source: string;
  files: string[];
  page: boolean;
}

export interface PopoutState {
  open: boolean;
  lesson?: string;
}

let catalog: Part[] | undefined;
let chaptersById: Chapter[] = [];
let mainWindow: BrowserWindow | undefined;
let popout: BrowserWindow | undefined;
let popoutLesson: string | undefined;
let run: RunSession | undefined;
let runSender: WebContents | undefined;

async function getCatalog(): Promise<Part[]> {
  if (catalog === undefined) {
    catalog = await loadParts(courseRoot);
    chaptersById = catalog.flatMap((part) => part.chapters);
  }
  return catalog;
}

// A step's id is its chapter and step folder names, with "homework/" in front of a homework step's name. A chapter's
// id is just its folder name. Only ids from the catalog are accepted, so a request can't name a path outside the course.
function lessonId(lesson: Lesson): string {
  return `${lesson.chapter}/${lesson.step}`;
}

async function findLesson(id: unknown): Promise<Lesson> {
  if (typeof id !== "string") {
    throw new Error("A lesson id must be a string");
  }
  await getCatalog();
  for (const chapter of chaptersById) {
    for (const lesson of chapter.lessons) {
      if (lessonId(lesson) === id) {
        return lesson;
      }
    }
  }
  throw new Error(`There is no lesson called "${id}"`);
}

async function findChapter(name: unknown): Promise<Chapter> {
  if (typeof name !== "string") {
    throw new Error("A chapter name must be a string");
  }
  await getCatalog();
  const chapter = chaptersById.find((item) => item.name === name);
  if (chapter === undefined) {
    throw new Error(`There is no chapter called "${name}"`);
  }
  return chapter;
}

function summarise(lesson: Lesson): LessonSummary {
  return {
    id: lessonId(lesson),
    title: lesson.meta.title,
    minutes: lesson.meta.minutes,
    homework: lesson.homework,
  };
}

// ---- The learner's progress ----

// The progress file lives in the user's data folder, outside the repository, so it's never committed.
function statePath(): string {
  return join(app.getPath("userData"), "progress.json");
}

let stateCache: AppState | undefined;

async function loadState(): Promise<AppState> {
  if (stateCache === undefined) {
    stateCache = parseState(await readFile(statePath(), "utf8").catch(() => undefined));
  }
  return stateCache;
}

// Writes the one shared copy of the state. Each window sends only its own change, so a pop-out can't overwrite progress
// made in the main window.
async function saveState(): Promise<void> {
  const state = await loadState();
  await mkdir(dirname(statePath()), { recursive: true });
  await writeFile(statePath(), serialiseState(state), "utf8");
}

// ---- The pop-out window ----

function popoutState(): PopoutState {
  return popout === undefined ? { open: false } : { open: true, lesson: popoutLesson };
}

function notifyMainOfPopout(): void {
  if (mainWindow !== undefined && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("popout:state", popoutState());
  }
}

function openPopout(id: string): void {
  if (popout !== undefined && !popout.isDestroyed()) {
    popoutLesson = id;
    popout.webContents.send("lesson:show", id);
    popout.focus();
    notifyMainOfPopout();
    return;
  }

  popoutLesson = id;
  popout = createWindow({ mode: "lesson", lesson: id }, POPOUT_SIZE);
  popout.on("closed", () => {
    popout = undefined;
    popoutLesson = undefined;
    notifyMainOfPopout();
  });
  notifyMainOfPopout();
}

// Keeps an open pop-out on the same lesson as the main window. Does nothing when no pop-out is open.
function syncPopout(id: string): void {
  if (popout !== undefined && !popout.isDestroyed()) {
    popoutLesson = id;
    popout.webContents.send("lesson:show", id);
    notifyMainOfPopout();
  }
}

// ---- Reading lessons ----

async function readOptional(path: string): Promise<string> {
  return readFile(path, "utf8").catch(() => "");
}

async function viewOfStep(lesson: Lesson): Promise<LessonView> {
  const markdownSource = await readFile(join(lesson.path, "lesson.md"), "utf8");
  const code = await readOptional(join(lesson.path, "main.ts"));
  return {
    id: lessonId(lesson),
    kind: "step",
    title: lesson.meta.title,
    objective: lesson.meta.objective,
    minutes: lesson.meta.minutes,
    homework: lesson.homework,
    runnable: code !== "",
    html: markdown.render(markdownSource),
    markdown: markdownSource,
    source: code,
    files: await listCodeFiles(lesson.path),
    page: existsSync(join(lesson.path, "index.html")),
  };
}

async function viewOfChapter(chapter: Chapter): Promise<LessonView> {
  const introSource = await readOptional(join(chapter.path, "lesson.md"));
  const text = introSource === "" ? "This chapter has no introduction yet." : introSource;
  return {
    id: chapter.name,
    kind: "chapter",
    title: chapterTitle(chapter.name),
    objective: "",
    minutes: 0,
    homework: false,
    runnable: false,
    html: markdown.render(text),
    markdown: text,
    source: "",
    files: [],
    page: false,
  };
}

// ---- Run and Check ----

// Sends a run event to the window that started the run. The run session is shared, so events go to the latest sender.
function sessionFor(sender: WebContents): RunSession {
  runSender = sender;
  run ??= new RunSession((event: RunEvent) => {
    if (runSender !== undefined && !runSender.isDestroyed()) {
      runSender.send("run:event", event);
    }
  });
  return run;
}

// Node is needed on PATH, at version 24 or later. The check happens before anything is copied or started, so the
// window can say what's wrong.
async function requireNode(): Promise<void> {
  const major = await nodeMajorVersion();
  if (major === undefined) {
    throw new Error("Node.js wasn't found on PATH. Install Node.js 24 or later, then open the runner again.");
  }
  if (major < 24) {
    throw new Error(`Node.js ${major} is installed, but this course needs Node.js 24 or later.`);
  }
}

// The editor's text for every code file. Only files that belong to the lesson are accepted, and main.ts is always there.
async function requireFiles(lesson: Lesson, raw: unknown): Promise<Record<string, string>> {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    throw new Error("The editor's files must be an object");
  }
  const allowed = await listCodeFiles(lesson.path);
  const files: Record<string, string> = {};
  for (const [name, text] of Object.entries(raw)) {
    if (!allowed.includes(name) || typeof text !== "string") {
      throw new Error(`"${name}" is not a code file of this lesson`);
    }
    files[name] = text;
  }
  if (files["main.ts"] === undefined) {
    files["main.ts"] = await readFile(join(lesson.path, "main.ts"), "utf8");
  }
  return files;
}

// ---- IPC ----

async function summariseParts(): Promise<PartSummary[]> {
  const parts = await getCatalog();
  return parts.map((part) => ({
    title: part.title,
    chapters: part.chapters.map((chapter) => ({
      name: chapter.name,
      lessons: chapter.lessons.map(summarise),
    })),
  }));
}

function registerHandlers(): void {
  ipcMain.handle("catalog:list", async (): Promise<PartSummary[]> => summariseParts());

  // Re-reads the course from disk, so lessons added since the runner started appear without a restart.
  ipcMain.handle("catalog:refresh", async (): Promise<PartSummary[]> => {
    catalog = undefined;
    return summariseParts();
  });

  ipcMain.handle("lesson:open", async (_event, id: unknown): Promise<LessonView> => {
    return viewOfStep(await findLesson(id));
  });

  ipcMain.handle("chapter:open", async (_event, name: unknown): Promise<LessonView> => {
    return viewOfChapter(await findChapter(name));
  });

  // The complete solution to a homework exercise. It's only sent when the learner reveals it, not with the lesson.
  ipcMain.handle("lesson:solution", async (_event, id: unknown): Promise<string> => {
    const lesson = await findLesson(id);
    return readOptional(join(lesson.path, "solution.ts"));
  });

  // Colors a block of code for the editor's highlight layer. The label says which language the file is in.
  ipcMain.handle("code:highlight", (_event, code: unknown, label: unknown): string => {
    if (typeof code !== "string") {
      return "";
    }
    const language = typeof label === "string" ? label : "typescript";
    return highlightCode(language, code) ?? highlightCode("plain", code) ?? "";
  });

  // Runs the editor's files. They are copied into the step's work folder first, so the lesson files are untouched.
  ipcMain.handle("run:start", async (event, id: unknown, files: unknown): Promise<void> => {
    const lesson = await findLesson(id);
    const text = await requireFiles(lesson, files);
    if (existsSync(join(lesson.path, "index.html"))) {
      // A page step runs in its own window, not under Node. Its TypeScript is compiled to JavaScript beside the page.
      const pageFile = await prepareWorkspace(courseRoot, lessonId(lesson), lesson.path, text);
      await writeBrowserModules(dirname(pageFile), text);
      openPageWindow(join(dirname(pageFile), "index.html"));
      return;
    }
    await requireNode();
    const mainFile = await prepareWorkspace(courseRoot, lessonId(lesson), lesson.path, text);
    sessionFor(event.sender).start(mainFile, dirname(mainFile));
  });

  ipcMain.handle("run:input", (_event, text: unknown): void => {
    if (typeof text === "string") {
      run?.write(text);
    }
  });

  ipcMain.handle("run:stop", (): void => {
    run?.stop();
  });

  // Type-checks the editor's files, in the same work folder as Run.
  ipcMain.handle("check:run", async (_event, id: unknown, files: unknown): Promise<Diagnostic[]> => {
    const lesson = await findLesson(id);
    const text = await requireFiles(lesson, files);
    const mainFile = await prepareWorkspace(courseRoot, lessonId(lesson), lesson.path, text);
    return checkFile(mainFile, tsconfigPath);
  });

  // Reads one code file of a lesson, for the editor's file tabs. Only the lesson's own code files can be read.
  ipcMain.handle("lesson:file", async (_event, id: unknown, name: unknown): Promise<string> => {
    const lesson = await findLesson(id);
    const allowed = await listCodeFiles(lesson.path);
    if (typeof name !== "string" || !allowed.includes(name)) {
      throw new Error(`"${String(name)}" is not a code file of this lesson`);
    }
    return readFile(join(lesson.path, name), "utf8");
  });

  ipcMain.handle("lesson:popout", async (_event, id: unknown): Promise<void> => {
    // A step's id contains a slash. A chapter introduction's id is just the chapter's name.
    if (typeof id === "string" && id.includes("/")) {
      openPopout(lessonId(await findLesson(id)));
    } else {
      openPopout((await findChapter(id)).name);
    }
  });

  // The main window calls this whenever it shows a different step, so an open pop-out follows it.
  ipcMain.handle("popout:sync", async (_event, id: unknown): Promise<void> => {
    if (typeof id === "string") {
      syncPopout(id);
    }
  });

  ipcMain.handle("popout:redock", (): void => {
    if (popout !== undefined && !popout.isDestroyed()) {
      popout.close();
    }
  });

  ipcMain.handle("popout:state", (): PopoutState => popoutState());

  // The main window closes the page when the learner moves to another chapter or step.
  ipcMain.handle("page:close", (): void => {
    closePage();
  });

  // The learner's progress: the last lesson, and the quiz answers and revealed homework for each lesson.
  ipcMain.handle("state:get", (): Promise<AppState> => loadState());
  ipcMain.handle("state:saveProgress", async (_event, id: unknown, progress: unknown): Promise<void> => {
    if (typeof id !== "string" || typeof progress !== "object" || progress === null) {
      return;
    }
    const cleaned = parseState(JSON.stringify({ progress: { [id]: progress } })).progress[id];
    if (cleaned !== undefined) {
      (await loadState()).progress[id] = cleaned;
      await saveState();
    }
  });
  ipcMain.handle("state:saveLast", async (_event, id: unknown): Promise<void> => {
    if (typeof id === "string") {
      (await loadState()).last = id;
      await saveState();
    }
  });
  // Clears all progress: quiz answers, revealed homework, and the last lesson. Every window then redraws.
  ipcMain.handle("state:reset", async (): Promise<void> => {
    stateCache = emptyState();
    await saveState();
    for (const window of [mainWindow, popout]) {
      if (window !== undefined && !window.isDestroyed()) {
        window.webContents.send("progress:reset");
      }
    }
  });
}

// ---- The page window: a step whose lesson is a web page opens here, in its own resizable window ----

let pageWindow: BrowserWindow | undefined;

// Writes each TypeScript file as browser JavaScript beside the page, so index.html can load it.
async function writeBrowserModules(folder: string, files: Record<string, string>): Promise<void> {
  for (const [name, text] of Object.entries(files)) {
    if (name.endsWith(".ts")) {
      await writeFile(join(folder, name.replace(/\.ts$/, ".js")), transpileForBrowser(text), "utf8");
    }
  }
}

// Opens the page in its own window. The page has no access to Node or the file system, and it can't leave its page.
function openPageWindow(indexPath: string): void {
  closePage();
  const window = new BrowserWindow({
    width: POPOUT_SIZE.width,
    height: POPOUT_SIZE.height,
    title: "Page",
    resizable: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
  });
  const pageUrl = pathToFileURL(indexPath).href;
  window.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  window.webContents.on("will-navigate", (event, url) => {
    if (url !== pageUrl) {
      event.preventDefault();
    }
  });
  pageWindow = window;
  window.on("closed", () => {
    if (pageWindow === window) {
      pageWindow = undefined;
    }
  });
  void window.loadFile(indexPath);
}

// Closes the page window, if one is open. Moving to another chapter or step, or closing the main window, calls this.
function closePage(): void {
  if (pageWindow !== undefined && !pageWindow.isDestroyed()) {
    pageWindow.close();
  }
  pageWindow = undefined;
}

// ---- Windows ----

// Opens a web link in the default browser. Anything that isn't an http or https address is ignored.
function openExternalLink(url: string): void {
  if (/^https?:\/\//i.test(url)) {
    void shell.openExternal(url);
  }
}

function createWindow(query: Record<string, string>, size: { width: number; height: number } = MAIN_SIZE): BrowserWindow {
  const window = new BrowserWindow({
    ...size,
    title: "TypeScript Training",
    autoHideMenuBar: true,
    icon: existsSync(windowIcon) ? windowIcon : undefined,
    webPreferences: {
      preload: join(here, "preload.js"),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
  });

  // Links in a lesson open in the default browser. Only web addresses are passed on, so a link can't start anything
  // else on the computer. The window itself never navigates away from its page.
  window.webContents.setWindowOpenHandler(({ url }) => {
    openExternalLink(url);
    return { action: "deny" };
  });
  window.webContents.on("will-navigate", (event, url) => {
    event.preventDefault();
    openExternalLink(url);
  });

  void window.loadFile(join(here, "renderer", "index.html"), { query });
  return window;
}

function openMainWindow(): void {
  mainWindow = createWindow({});
  mainWindow.on("closed", () => {
    mainWindow = undefined;
    closePage();
    // Closing the main program closes its pop-out too, so nothing is left running behind it.
    if (popout !== undefined && !popout.isDestroyed()) {
      popout.close();
    }
  });
}

app
  .whenReady()
  .then(() => {
    // The runner has no File, Edit, View, or Window menus, so the application menu is removed.
    Menu.setApplicationMenu(null);
    registerHandlers();
    openMainWindow();
  })
  .catch((err: unknown) => {
    console.error(err);
    app.exit(1);
  });

// Any running program is stopped, and the work folder is removed, when the runner closes.
app.on("before-quit", () => {
  run?.stop();
  cleanWorkspaceSync(courseRoot);
});

app.on("window-all-closed", () => {
  app.quit();
});
