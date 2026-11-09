// The window's UI. This is a plain script with no imports: the sandboxed page can't load modules, and it reaches the
// main process only through window.runner, which the preload exposes.

interface LessonSummary {
  id: string;
  title: string;
  minutes: number;
  homework: boolean;
}

interface ChapterSummary {
  name: string;
  lessons: LessonSummary[];
}

interface PartSummary {
  title: string;
  chapters: ChapterSummary[];
}

interface LessonView {
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
}

interface PopoutState {
  open: boolean;
  lesson?: string;
}

interface RunnerApi {
  listParts(): Promise<PartSummary[]>;
  refreshParts(): Promise<PartSummary[]>;
  getState(): Promise<AppState>;
  saveProgress(id: string, progress: LessonProgress): Promise<void>;
  saveLast(id: string): Promise<void>;
  resetProgress(): Promise<void>;
  onProgressReset(callback: () => void): void;
  openLesson(id: string): Promise<LessonView>;
  openChapter(name: string): Promise<LessonView>;
  highlight(code: string): Promise<string>;
  solution(id: string): Promise<string>;
  popOutLesson(id: string): Promise<void>;
  syncPopout(id: string): Promise<void>;
  redock(): Promise<void>;
  popoutState(): Promise<PopoutState>;
  onPopoutState(callback: (state: PopoutState) => void): void;
  onShowLesson(callback: (id: string) => void): void;
  run(id: string, files: Record<string, string>): Promise<void>;
  sendInput(text: string): Promise<void>;
  stopRun(): Promise<void>;
  check(id: string, files: Record<string, string>): Promise<Diagnostic[]>;
  codeFile(id: string, name: string): Promise<string>;
  onRunEvent(callback: (event: RunnerEvent) => void): void;
}

interface Diagnostic {
  line: number;
  column: number;
  message: string;
}

type RunnerEvent =
  | { kind: "stdout" | "stderr" | "status"; text: string }
  | { kind: "done"; code: number | null; timedOut: boolean };

interface QuizProgress {
  chosen?: number;
  typed?: string;
  verdict?: "correct" | "wrong";
  revealed?: boolean;
}

interface LessonProgress {
  revealed?: boolean;
  quizzes?: Record<string, QuizProgress>;
}

interface AppState {
  last?: string;
  progress: Record<string, LessonProgress>;
}

interface Window {
  runner: RunnerApi;
}

// Icons drawn on an 18 x 18 grid, in the same style as the C++ runner.
const ICONS: Record<string, string> = {
  copy: '<rect x="3.5" y="5.5" width="9" height="9.5" rx="2"/><rect x="6.5" y="2.5" width="9" height="9.5" rx="2"/>',
  clear: '<line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/>',
  popout: '<line x1="5" y1="13" x2="13" y2="5"/><polyline points="7,5 13,5 13,11"/>',
  moon: '<defs><mask id="moon-cut"><rect width="18" height="18" fill="white"/><circle cx="12.5" cy="6.5" r="5.5" fill="black"/></mask></defs><circle cx="9" cy="9" r="6.5" fill="currentColor" stroke="none" mask="url(#moon-cut)"/>',
  sun: '<circle cx="9" cy="9" r="3.5"/><line x1="9" y1="1" x2="9" y2="3"/><line x1="9" y1="15" x2="9" y2="17"/><line x1="1" y1="9" x2="3" y2="9"/><line x1="15" y1="9" x2="17" y2="9"/><line x1="3.5" y1="3.5" x2="5" y2="5"/><line x1="13" y1="13" x2="14.5" y2="14.5"/><line x1="3.5" y1="14.5" x2="5" y2="13"/><line x1="13" y1="5" x2="14.5" y2="3.5"/>',
  chevron: '<polyline points="6,4 11,9 6,14"/>',
  dock: '<line x1="13" y1="5" x2="5" y2="13"/><polyline points="5,7 5,13 11,13"/>',
};

function icon(name: string, size = 16): string {
  return `<svg class="icon" viewBox="0 0 18 18" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] ?? ""}</svg>`;
}

function el<T extends HTMLElement = HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (element === null) {
    throw new Error(`The window is missing #${id}`);
  }
  return element as T;
}

const params = new URLSearchParams(window.location.search);
const isPopout = params.get("mode") === "lesson";
const startLesson = params.get("lesson");

let current: LessonView | undefined;
let partsCache: PartSummary[] = [];
let revealed = false;
let original = "";
// A step can have several code files. Each has its own text (buffers) and the text it started with (originals).
let fileNames: string[] = [];
let activeFile = "main.ts";
let buffers: Record<string, string> = {};
let originals: Record<string, string> = {};
let popoutOpen = false;
let running = false;
// The id of the lesson whose text is in the lesson pane, and the scroll position each lesson was left at.
let renderedId: string | undefined;
const scrollPositions = new Map<string, number>();
// What the learner has done, kept between runs: the last lesson, and each lesson's quiz answers and revealed homework.
let appState: AppState = { progress: {} };
let lessonSize = 14;

// Shown in the editor when a lesson or chapter has no runnable code. The editor is read-only in that case.
const NO_CODE_COMMENT = "// There's no runnable code here. Choose a step to see its code.";

// ---- Progress: the last lesson, and each lesson's quiz answers and revealed homework ----

function progressFor(id: string): LessonProgress {
  const existing = appState.progress[id];
  if (existing !== undefined) {
    return existing;
  }
  const created: LessonProgress = {};
  appState.progress[id] = created;
  return created;
}

// Sends one lesson's progress to the main process, which keeps the one shared copy.
function saveProgress(id: string): void {
  void window.runner.saveProgress(id, progressFor(id));
}

function recordQuiz(lessonId: string, index: number, value: QuizProgress): void {
  const progress = progressFor(lessonId);
  progress.quizzes ??= {};
  progress.quizzes[String(index)] = value;
  saveProgress(lessonId);
}

// Puts back the answers given before. A choice is clicked again, and a typed answer is checked again.
function restoreQuizProgress(lessonId: string, quizzes: HTMLElement[]): void {
  const saved = progressFor(lessonId).quizzes ?? {};
  quizzes.forEach((quiz, index) => {
    const entry = saved[String(index)];
    if (entry === undefined) {
      return;
    }
    if (entry.chosen !== undefined) {
      const choice = quiz.querySelectorAll<HTMLLIElement>(".quiz-choice")[entry.chosen];
      choice?.querySelector<HTMLButtonElement>("button")?.click();
    }
    if (entry.typed !== undefined) {
      const input = quiz.querySelector<HTMLInputElement>("input");
      if (input !== null) {
        input.value = entry.typed;
        input.dispatchEvent(new Event("change"));
      }
    }
  });
}

// ---- Theme ----

function applyTheme(light: boolean): void {
  document.body.classList.toggle("light", light);
  el<HTMLInputElement>("theme").checked = light;
  localStorage.setItem("theme", light ? "light" : "dark");
}

function setupTheme(): void {
  el("moon").innerHTML = icon("moon", 16);
  el("sun").innerHTML = icon("sun", 16);
  el("copy-output").innerHTML = icon("copy");
  el("clear").innerHTML = icon("clear");
  el("copy-source").innerHTML = icon("copy");
  el("popout").innerHTML = icon("popout");
  applyTheme(localStorage.getItem("theme") === "light");
  el<HTMLInputElement>("theme").addEventListener("change", (event) => {
    applyTheme((event.target as HTMLInputElement).checked);
  });
}

// ---- Zoom: Ctrl + scroll wheel changes the lesson's text size. The page itself never zooms. ----

function setupZoom(): void {
  document.addEventListener(
    "wheel",
    (event) => {
      if (!event.ctrlKey) {
        return;
      }
      event.preventDefault();
      if (!el("lesson").contains(event.target as Node)) {
        return;
      }
      lessonSize = Math.min(28, Math.max(10, lessonSize + (event.deltaY < 0 ? 1 : -1)));
      document.documentElement.style.setProperty("--lesson-size", `${lessonSize}px`);
    },
    { passive: false },
  );
}

// ---- Output ----

function copyText(text: string): void {
  void navigator.clipboard.writeText(text);
}

// ---- The tabs ----

function activeTab(): "source" | "lesson" {
  const active = document.querySelector<HTMLButtonElement>(".tab.active");
  return active?.dataset.tab === "lesson" ? "lesson" : "source";
}

// Run and Check are enabled only when the step has code, and a homework step's example has been revealed. In the pop-out
// there's no editor, so they stay disabled there.
function updateRunButtons(): void {
  const gated = current?.homework === true && !revealed;
  const enabled = current?.kind === "step" && current.runnable && !gated && !isPopout;
  el<HTMLButtonElement>("run").disabled = !enabled || running;
  el<HTMLButtonElement>("check").disabled = !enabled || running;
}

function showTab(name: "source" | "lesson"): void {
  const isHomework = current?.homework === true;
  const tab = name;

  for (const button of Array.from(document.querySelectorAll<HTMLButtonElement>(".tab"))) {
    button.classList.toggle("active", button.dataset.tab === tab);
  }
  const showLesson = tab === "lesson";
  // In the main window, a lesson that's open in its own window is shown as a re-dock panel, not as a second copy.
  const lessonInWindow = showLesson && popoutOpen && !isPopout;
  el("lesson").classList.toggle("hidden", !showLesson || lessonInWindow);
  // Returning to a lesson's text goes back to where it was read to. A hidden pane loses its scroll position, so the
  // position is set again each time the pane is shown.
  if (showLesson && !lessonInWindow && renderedId !== undefined) {
    el("lesson").scrollTop = scrollPositions.get(renderedId) ?? 0;
  }
  el("redock").classList.toggle("hidden", !lessonInWindow);

  const gated = isHomework && !revealed;
  el("spoiler").classList.toggle("hidden", showLesson || !gated);
  el("editor-area").classList.toggle("hidden", showLesson || gated);
  el("reset").classList.toggle("hidden", showLesson);

  const changed = el<HTMLTextAreaElement>("editor").value !== original;
  el("modified").classList.toggle("hidden", showLesson || !changed);
  updateRunButtons();
}

// Reveals the complete solution, shown read-only in the editor. Homework is solved in the learner's own file, so the
// runner only shows the example and lets it be run.
async function revealSolution(): Promise<void> {
  if (current === undefined) {
    return;
  }
  revealed = true;
  progressFor(current.id).revealed = true;
  saveProgress(current.id);
  await switchFile(fileNames[0] ?? activeFile);
  const editor = el<HTMLTextAreaElement>("editor");
  editor.value = await window.runner.solution(current.id);
  buffers[activeFile] = editor.value;
  originals[activeFile] = editor.value;
  original = editor.value;
  editor.readOnly = true;
  await refreshEditor();
  showTab("source");
}

function setupTabs(): void {
  for (const button of Array.from(document.querySelectorAll<HTMLButtonElement>(".tab"))) {
    button.addEventListener("click", () => {
      showTab(button.dataset.tab === "lesson" ? "lesson" : "source");
    });
  }
  el("reveal").addEventListener("click", () => {
    void revealSolution();
  });
  el("redock-button").addEventListener("click", () => {
    void window.runner.redock();
  });
}

// ---- Code files: a step can have more than one, and each keeps its own text while the learner works on another ----

// The text of every file the learner has opened or edited, for Run and Check.
function collectFiles(): Record<string, string> {
  const files: Record<string, string> = { ...buffers };
  files[activeFile] = el<HTMLTextAreaElement>("editor").value;
  return files;
}

// Shows a drop-down of the code files when a step has more than one. A changed file is marked with an asterisk.
function renderFileTabs(): void {
  const bar = el("file-tabs");
  const select = el<HTMLSelectElement>("file-select");
  if (fileNames.length < 2) {
    bar.classList.add("hidden");
    select.replaceChildren();
    return;
  }
  bar.classList.remove("hidden");
  const options = fileNames.map((name) => {
    const value = name === activeFile ? el<HTMLTextAreaElement>("editor").value : (buffers[name] ?? "");
    const changed = value !== (originals[name] ?? "");
    const option = document.createElement("option");
    option.value = name;
    option.textContent = changed ? `${name} *` : name;
    option.selected = name === activeFile;
    return option;
  });
  select.replaceChildren(...options);
  // Assigning the handler replaces the previous one, so re-rendering never stacks handlers.
  select.onchange = () => {
    void switchFile(select.value);
  };
}

// Moves to another code file, keeping the edits made to the one being left.
async function switchFile(name: string): Promise<void> {
  if (name === activeFile || current === undefined) {
    return;
  }
  const editor = el<HTMLTextAreaElement>("editor");
  buffers[activeFile] = editor.value;
  if (buffers[name] === undefined) {
    const text = await window.runner.codeFile(current.id, name);
    buffers[name] = text;
    originals[name] = text;
  }
  activeFile = name;
  editor.value = buffers[name];
  original = originals[name] ?? "";
  editor.readOnly = !current.runnable || (revealed && name === fileNames[0]);
  await refreshEditor();
}

// ---- Editor ----

async function refreshEditor(): Promise<void> {
  const editor = el<HTMLTextAreaElement>("editor");
  const code = editor.value;
  const lines = code.split("\n").length;
  el("gutter").textContent = Array.from({ length: lines }, (_item, index) => String(index + 1)).join("\n");
  el("highlight").innerHTML = (await window.runner.highlight(code)) + "\n";
  const changed = code !== original;
  el("modified").classList.toggle("hidden", !changed || activeTab() === "lesson");
  el<HTMLButtonElement>("reset").disabled = !changed;
  renderFileTabs();
}

function setupEditor(): void {
  const editor = el<HTMLTextAreaElement>("editor");
  editor.addEventListener("input", () => {
    void refreshEditor();
  });
  editor.addEventListener("scroll", () => {
    el("highlight").scrollTop = editor.scrollTop;
    el("highlight").scrollLeft = editor.scrollLeft;
    el("gutter").scrollTop = editor.scrollTop;
  });
  el<HTMLButtonElement>("reset").addEventListener("click", () => {
    editor.value = original;
    void refreshEditor();
  });
}

// ---- Copying: the Lesson tab copies the lesson's raw Markdown; the Source tab copies the editor's code ----

function setupCopy(): void {
  el("copy-source").addEventListener("click", () => {
    if (activeTab() === "lesson") {
      copyText(current?.markdown ?? "");
    } else {
      copyText(el<HTMLTextAreaElement>("editor").value);
    }
  });
  el("copy-output").addEventListener("click", () => copyText(el("output").textContent ?? ""));
  el("clear").addEventListener("click", () => {
    el("output").textContent = "";
  });
}

// ---- Showing a lesson or a chapter introduction ----

function showError(message: string): void {
  const paragraph = document.createElement("p");
  paragraph.className = "error";
  paragraph.textContent = message;
  el("lesson").replaceChildren(paragraph);
  showTab("lesson");
}

function chapterOf(id: string): string {
  return id.split("/")[0];
}

// Shows a view in the lesson pane. For a step, the editor is loaded too. For a chapter introduction, the editor is
// set to a comment saying so, because there's no code to edit.
async function show(view: LessonView): Promise<void> {
  const previousTab = activeTab();
  // A lesson seen before returns to where it was left. A lesson seen for the first time starts at the top.
  const restoreTo = scrollPositions.get(view.id) ?? 0;
  // Each step starts with a clean output pane. A program still running from the last step is stopped first, so its
  // output doesn't show up under this one.
  if (running) {
    void window.runner.stopRun();
  }
  el("output").textContent = "";
  current = view;
  revealed = progressFor(view.id).revealed === true;

  el("title").textContent = view.title;

  // The step's code files, with main.ts first. Each file keeps its own text and its own original, so switching files
  // keeps the edits made to each one.
  fileNames = view.runnable ? view.files : [];
  activeFile = fileNames[0] ?? "main.ts";
  const editor = el<HTMLTextAreaElement>("editor");
  const starting = view.runnable ? view.source : NO_CODE_COMMENT;
  buffers = { [activeFile]: starting };
  originals = { [activeFile]: starting };
  editor.value = starting;
  original = starting;
  editor.readOnly = !view.runnable;
  // A revealed homework exercise opens on its solution, read-only, so the learner sees the complete example.
  if (revealed && view.homework) {
    editor.value = await window.runner.solution(view.id);
    buffers[activeFile] = editor.value;
    originals[activeFile] = editor.value;
    original = editor.value;
    editor.readOnly = true;
  }
  renderFileTabs();
  await refreshEditor();

  const body = el("lesson");
  body.innerHTML = view.html;
  renderedId = view.id;
  Array.from(body.querySelectorAll<HTMLElement>(".quiz")).forEach((quiz, index) => {
    wireQuiz(quiz, view.id, index);
  });

  el<HTMLButtonElement>("popout").disabled = isPopout;
  showTab(view.kind === "chapter" || isPopout ? "lesson" : previousTab);
  // The pane must be visible before its scroll position can be set.
  el("lesson").scrollTop = restoreTo;
}

async function openLesson(id: string): Promise<void> {
  try {
    const view = await window.runner.openLesson(id);
    await show(view);
    if (!isPopout) {
      appState.last = view.id;
      void window.runner.saveLast(view.id);
      selectChapter(chapterOf(view.id), view.homework);
      markSelectedStep(view.id);
      void window.runner.syncPopout(view.id);
    }
  } catch (err) {
    showError(err instanceof Error ? err.message : String(err));
  }
}

async function openChapter(name: string): Promise<void> {
  try {
    const view = await window.runner.openChapter(name);
    await show(view);
    selectChapter(name, false);
    if (!isPopout) {
      appState.last = name;
      void window.runner.saveLast(name);
      void window.runner.syncPopout(name);
    }
  } catch (err) {
    showError(err instanceof Error ? err.message : String(err));
  }
}

// ---- Quizzes ----

// A choice quiz: clicking a choice marks it right or wrong, and shows that choice's feedback.
function wireChoiceSet(set: HTMLElement, lessonId: string, index: number): void {
  const items = Array.from(set.querySelectorAll<HTMLLIElement>(".quiz-choice"));
  for (const item of items) {
    const button = item.querySelector<HTMLButtonElement>("button");
    if (button === null) {
      continue;
    }
    button.addEventListener("click", () => {
      for (const other of items) {
        other.classList.remove("right", "wrong");
        const feedback = other.querySelector<HTMLElement>(".quiz-feedback");
        if (feedback !== null) {
          feedback.hidden = true;
        }
      }
      item.classList.add(item.dataset.correct === "true" ? "right" : "wrong");
      recordQuiz(lessonId, index, { chosen: items.indexOf(item) });
      const feedback = item.querySelector<HTMLElement>(".quiz-feedback");
      if (feedback !== null) {
        feedback.hidden = false;
      }
    });
  }
}

// A fill-in quiz: the answer is checked when the learner presses Enter or leaves the field.
function wireFillQuiz(quiz: HTMLElement, lessonId: string, index: number): void {
  const input = quiz.querySelector<HTMLInputElement>("input");
  if (input === null) {
    return;
  }
  const expected = input.dataset.answer ?? "";
  const status = document.createElement("p");
  status.className = "quiz-status";
  quiz.append(status);

  const check = (): void => {
    const typed = input.value.trim();
    if (typed === "") {
      return;
    }
    recordQuiz(lessonId, index, { typed: input.value });
    if (typed === expected) {
      status.textContent = "Right.";
      status.className = "quiz-status right";
      const feedback = quiz.querySelector<HTMLElement>(".quiz-feedback");
      if (feedback !== null) {
        feedback.hidden = false;
      }
    } else {
      status.textContent = "Not quite. Try again.";
      status.className = "quiz-status wrong";
    }
  };

  input.addEventListener("change", check);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      check();
    }
  });
}

// ---- Quizzes, as in the C++ course: pick an answer, press Check answer, and Try again or Show answer as needed ----

// Wires one question. Its answer, verdict, and reveal are saved for the lesson, so they survive a restart.
function wireQuiz(quiz: HTMLElement, lessonId: string, index: number): void {
  const labels = Array.from(quiz.querySelectorAll<HTMLLabelElement>(".quiz-choice"));
  const radios = Array.from(quiz.querySelectorAll<HTMLInputElement>('input[type="radio"]'));
  const text = quiz.querySelector<HTMLInputElement>("input.quiz-text");
  const feedback = quiz.querySelector<HTMLElement>(".quiz-feedback");
  const check = quiz.querySelector<HTMLButtonElement>(".quiz-check");
  const retry = quiz.querySelector<HTMLButtonElement>(".quiz-retry");
  const show = quiz.querySelector<HTMLButtonElement>(".quiz-show");
  if (feedback === null || check === null || retry === null || show === null) {
    return;
  }
  const isChoice = labels.length > 0;
  const key = String(index);

  const read = (): QuizProgress => progressFor(lessonId).quizzes?.[key] ?? {};
  const write = (patch: QuizProgress): void => {
    const progress = progressFor(lessonId);
    progress.quizzes ??= {};
    progress.quizzes[key] = { ...progress.quizzes[key], ...patch };
    saveProgress(lessonId);
  };

  const message = (kind: string, text: string, explanation: string): void => {
    feedback.className = `quiz-feedback ${kind}`;
    feedback.replaceChildren();
    const line = document.createElement("div");
    line.textContent = text;
    feedback.append(line);
    if (explanation !== "") {
      const note = document.createElement("div");
      note.className = "explain";
      note.textContent = explanation;
      feedback.append(note);
    }
  };

  const paint = (): void => {
    const state = read();
    const locked = state.verdict === "correct" || state.revealed === true;
    radios.forEach((radio) => (radio.disabled = locked));
    if (text !== null) {
      text.disabled = locked;
    }
    check.classList.toggle("hidden", locked);
    show.classList.toggle("hidden", locked);
    retry.classList.toggle("hidden", !(state.verdict === "wrong" && state.revealed !== true));

    labels.forEach((label, position) => {
      const right = label.dataset.correct === "true";
      label.classList.toggle("right", right && (state.revealed === true || state.verdict === "correct"));
      label.classList.toggle("picked-wrong", position === state.chosen && !right && state.verdict === "wrong");
    });
    if (state.chosen !== undefined && radios[state.chosen] !== undefined) {
      radios[state.chosen].checked = true;
    }

    const picked = state.chosen === undefined ? undefined : labels[state.chosen];
    const correctLabel = labels.find((label) => label.dataset.correct === "true");
    if (state.revealed === true) {
      const answer = isChoice ? (correctLabel?.textContent ?? "") : (quiz.dataset.answer ?? "");
      const explanation = isChoice ? (correctLabel?.dataset.explanation ?? "") : (quiz.dataset.explanation ?? "");
      message("correct", `The answer is: ${answer.trim()}`, explanation);
    } else if (state.verdict === "correct") {
      message("correct", "Correct.", picked?.dataset.explanation ?? "");
    } else if (state.verdict === "wrong") {
      const explanation = picked?.dataset.explanation || quiz.dataset.explanation || "";
      message("wrong", "Not quite. Try again.", explanation);
    } else {
      feedback.className = "quiz-feedback";
      feedback.replaceChildren();
    }
  };

  // A note that doesn't change the saved state, such as "Choose an answer first."
  const note = (text: string): void => {
    message("", text, "");
  };

  if (text !== null) {
    text.value = read().typed ?? "";
  }
  paint();

  check.addEventListener("click", () => {
    if (isChoice) {
      const chosen = radios.findIndex((radio) => radio.checked);
      if (chosen < 0) {
        note("Choose an answer first.");
        return;
      }
      const correct = labels[chosen].dataset.correct === "true";
      write({ chosen, verdict: correct ? "correct" : "wrong" });
    } else if (text !== null) {
      const typed = text.value.trim();
      if (typed === "") {
        note("Type an answer first.");
        return;
      }
      const expected = (quiz.dataset.answer ?? "").trim().toLowerCase();
      const right = typed.toLowerCase() === expected;
      write({ typed: text.value, verdict: right ? "correct" : "wrong" });
    }
    paint();
  });

  retry.addEventListener("click", () => {
    write({ chosen: undefined, typed: undefined, verdict: undefined });
    radios.forEach((radio) => (radio.checked = false));
    if (text !== null) {
      text.value = "";
    }
    paint();
  });

  // Once the answer has been shown, the question is locked.
  show.addEventListener("click", () => {
    write({ revealed: true });
    paint();
  });
}

// ---- The chapters pane: parts, which collapse, and the chapters in them ----

function chapterTitle(name: string): string {
  // "ch01-getting-started" becomes "Ch01 · Getting started", as in the other courses.
  const match = /^ch(\d{2})-(.*)$/.exec(name);
  if (match === null) {
    return name;
  }
  const words = match[2].replaceAll("-", " ");
  return `Ch${match[1]} \u00b7 ${words.charAt(0).toUpperCase()}${words.slice(1)}`;
}

function renderChapters(): void {
  const sections: HTMLElement[] = [];

  for (const part of partsCache) {
    const heading = document.createElement("div");
    heading.className = "part-title open";
    heading.dataset.part = part.title;
    heading.innerHTML = `<span class="chevron">${icon("chevron", 12)}</span><span></span>`;
    heading.querySelector("span:last-child")!.textContent = part.title;

    const body = document.createElement("div");
    body.className = "part-body";
    for (const chapter of part.chapters) {
      const row = document.createElement("div");
      row.className = "chapter-row";
      row.dataset.chapter = chapter.name;
      row.textContent = chapterTitle(chapter.name);
      row.addEventListener("click", () => {
        void openChapter(chapter.name);
      });
      body.append(row);

      if (chapter.lessons.some((lesson) => lesson.homework)) {
        // Homework nests under its chapter, because it has its own steps.
        const homeworkRow = document.createElement("div");
        homeworkRow.className = "chapter-row homework-row hidden";
        homeworkRow.dataset.chapter = chapter.name;
        homeworkRow.dataset.homework = "true";
        homeworkRow.textContent = "Homework";
        homeworkRow.addEventListener("click", () => {
          selectChapter(chapter.name, true);
        });
        body.append(homeworkRow);
      }
    }

    heading.addEventListener("click", () => {
      openPart(part.title);
    });

    sections.push(heading, body);
  }

  el("chapters").replaceChildren(...sections);
}

// ---- The steps pane: the steps of the chosen chapter, or its homework ----

function findChapter(name: string): ChapterSummary | undefined {
  for (const part of partsCache) {
    for (const chapter of part.chapters) {
      if (chapter.name === name) {
        return chapter;
      }
    }
  }
  return undefined;
}

function stepRow(lesson: LessonSummary): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "step-row" + (lesson.homework ? " homework" : "");
  button.dataset.id = lesson.id;
  button.textContent = lesson.title;
  button.addEventListener("click", () => {
    void openLesson(lesson.id);
  });
  return button;
}

// Opens the part with this title, and collapses every other part, so only one part is open at a time.
function openPart(title: string): void {
  for (const heading of Array.from(document.querySelectorAll<HTMLElement>(".part-title"))) {
    const open = heading.dataset.part === title;
    heading.classList.toggle("open", open);
    heading.nextElementSibling?.classList.toggle("collapsed", !open);
  }
}

// Opens the part that holds the chapter.
function showPartOf(chapterName: string): void {
  const owner = partsCache.find((part) => part.chapters.some((chapter) => chapter.name === chapterName));
  if (owner !== undefined) {
    openPart(owner.title);
  }
}

function selectChapter(name: string, homework: boolean): void {
  showPartOf(name);
  // Homework is shown only under the chapter that's selected. The others collapse.
  for (const row of Array.from(document.querySelectorAll<HTMLElement>(".homework-row"))) {
    row.classList.toggle("hidden", row.dataset.chapter !== name);
  }
  for (const row of Array.from(document.querySelectorAll<HTMLElement>(".chapter-row"))) {
    const isHomeworkRow = row.dataset.homework === "true";
    row.classList.toggle("selected", row.dataset.chapter === name && isHomeworkRow === homework);
  }

  const chapter = findChapter(name);
  if (chapter === undefined) {
    el("steps").replaceChildren();
    return;
  }
  const wanted = chapter.lessons.filter((lesson) => lesson.homework === homework);
  el("steps").replaceChildren(...wanted.map(stepRow));
  if (current !== undefined) {
    markSelectedStep(current.id);
  }
}

function markSelectedStep(id: string): void {
  for (const row of Array.from(document.querySelectorAll<HTMLElement>(".step-row"))) {
    row.classList.toggle("selected", row.dataset.id === id);
  }
}

async function loadSidebar(): Promise<void> {
  try {
    partsCache = await window.runner.listParts();
    renderChapters();
    const last = appState.last;
    const lastExists =
      last !== undefined &&
      partsCache.some((part) =>
        part.chapters.some((chapter) => chapter.name === last || chapter.lessons.some((lesson) => lesson.id === last)),
      );
    if (last !== undefined && lastExists) {
      if (last.includes("/")) {
        await openLesson(last);
      } else {
        await openChapter(last);
      }
      return;
    }
    const first = partsCache.flatMap((part) => part.chapters).find((chapter) => chapter.lessons.length > 0);
    if (first !== undefined) {
      await openChapter(first.name);
    }
  } catch (err) {
    showError(err instanceof Error ? err.message : String(err));
  }
}

// Re-reads the course from disk and redraws the chapters and steps, so lessons added since the runner started appear.
// Ctrl+R does this. Without the menu, the browser's own reload is turned off, so the key is free for this.
async function refreshLessons(): Promise<void> {
  try {
    partsCache = await window.runner.refreshParts();
    renderChapters();
    if (current !== undefined) {
      selectChapter(chapterOf(current.id), current.homework);
      markSelectedStep(current.id);
    }
  } catch (err) {
    showError(err instanceof Error ? err.message : String(err));
  }
}

function setupRefresh(): void {
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "r") {
      event.preventDefault();
      void refreshLessons();
    }
  });
}

// ---- Resetting progress: Ctrl+Alt+Shift+Backspace clears quiz answers, re-hides homework examples, and forgets the last
// lesson. Every open window redraws its current lesson, and a short message confirms the reset. ----

let toastTimer: number | undefined;
let toastHideTimer: number | undefined;

// Shows a short message, which fades out by itself.
function showToast(message: string): void {
  const toast = el("toast");
  toast.textContent = message;
  toast.classList.remove("hidden", "fade");
  window.clearTimeout(toastTimer);
  window.clearTimeout(toastHideTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.add("fade");
  }, 1500);
  toastHideTimer = window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2300);
}

async function applyProgressReset(): Promise<void> {
  appState = { progress: {} };
  if (current !== undefined) {
    // Redrawing the lesson without going through openLesson or openChapter keeps the cleared last-lesson marker cleared.
    const view = current.kind === "step" ? await window.runner.openLesson(current.id) : await window.runner.openChapter(current.id);
    await show(view);
  }
  showToast("Progress reset");
}

function setupReset(): void {
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.altKey && event.shiftKey && event.key === "Backspace") {
      event.preventDefault();
      void window.runner.resetProgress();
    }
  });
  window.runner.onProgressReset(() => {
    void applyProgressReset();
  });
}

// ---- The pop-out ----

function setupPopout(): void {
  el("popout").addEventListener("click", () => {
    if (current !== undefined) {
      void window.runner.popOutLesson(current.id);
    }
  });
  window.runner.onPopoutState((state) => {
    popoutOpen = state.open;
    if (activeTab() === "lesson") {
      showTab("lesson");
    }
  });
}

// Remembers where the lesson pane was scrolled, for the lesson it's showing. Position changes made while a new lesson
// loads are corrected by the restore in show(), which sets the saved position.
function setupScroll(): void {
  el("lesson").addEventListener("scroll", () => {
    if (renderedId !== undefined) {
      scrollPositions.set(renderedId, el("lesson").scrollTop);
    }
  });
}

// ---- Run, Stop, input, and Check ----

function appendOutput(kind: "stdout" | "stderr" | "status" | "input" | "error", text: string): void {
  const output = el("output");
  const span = document.createElement("span");
  const className = kind === "stderr" || kind === "error" ? "error" : kind === "status" ? "status" : kind === "input" ? "input" : "";
  if (className !== "") {
    span.className = className;
  }
  span.textContent = text;
  output.append(span);
  output.scrollTop = output.scrollHeight;
}

function setRunning(value: boolean): void {
  running = value;
  el<HTMLInputElement>("input").disabled = !value;
  el<HTMLButtonElement>("send").disabled = !value;
  el<HTMLButtonElement>("stop").disabled = !value;
  updateRunButtons();
}

function handleRunEvent(event: RunnerEvent): void {
  if (event.kind === "done") {
    if (!event.timedOut) {
      appendOutput("status", `\nThe program finished with exit code ${event.code ?? "unknown"}.\n`);
    }
    setRunning(false);
    return;
  }
  appendOutput(event.kind, event.text);
}

async function runCurrent(): Promise<void> {
  if (current === undefined || current.kind !== "step") {
    return;
  }
  el("output").textContent = "";
  setRunning(true);
  try {
    await window.runner.run(current.id, collectFiles());
  } catch (err) {
    appendOutput("error", `${err instanceof Error ? err.message : String(err)}\n`);
    setRunning(false);
  }
}

function sendInputLine(): void {
  const input = el<HTMLInputElement>("input");
  const text = input.value;
  appendOutput("input", `${text}\n`);
  void window.runner.sendInput(text);
  input.value = "";
}

// Type-checks the editor's text, and lists each error with its line and column.
async function runCheck(): Promise<void> {
  if (current === undefined || current.kind !== "step") {
    return;
  }
  el("output").textContent = "";
  try {
    const diagnostics = await window.runner.check(current.id, collectFiles());
    if (diagnostics.length === 0) {
      appendOutput("status", "Check passed: no errors.\n");
      return;
    }
    for (const item of diagnostics) {
      appendOutput("error", `main.ts:${item.line}:${item.column} - error: ${item.message}\n`);
    }
  } catch (err) {
    appendOutput("error", `${err instanceof Error ? err.message : String(err)}\n`);
  }
}

function setupRun(): void {
  el("run").addEventListener("click", () => {
    void runCurrent();
  });
  el("check").addEventListener("click", () => {
    void runCheck();
  });
  el("stop").addEventListener("click", () => {
    void window.runner.stopRun();
  });
  el("input-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (running) {
      sendInputLine();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && running) {
      void window.runner.stopRun();
    }
  });
  window.runner.onRunEvent((event) => {
    handleRunEvent(event);
  });
}

// ---- Startup ----

async function start(): Promise<void> {
  setupTheme();
  setupZoom();
  setupEditor();
  setupTabs();
  setupCopy();
  setupPopout();
  setupRun();
  setupRefresh();
  setupScroll();
  setupReset();

  if (isPopout) {
    document.body.classList.add("popout");
    // The pop-out loads the saved state too, so its quiz answers are restored.
    appState = await window.runner.getState();
    // The pop-out always has the re-dock button, which closes it and returns the lesson to the main window.
    el("popout-dock").classList.remove("hidden");
    el("popout-dock").innerHTML = icon("dock");
    el("popout-dock").addEventListener("click", () => {
      void window.runner.redock();
    });
    // The pop-out also has the copy button, which copies the lesson's raw Markdown.
    el("popout-copy").classList.remove("hidden");
    el("popout-copy").innerHTML = icon("copy");
    el("popout-copy").addEventListener("click", () => {
      copyText(current?.markdown ?? "");
    });
    // The pop-out follows the main window. A chapter id has no slash, so it opens an introduction; a step id opens a step.
    window.runner.onShowLesson((id) => {
      if (id.includes("/")) {
        void openLesson(id);
      } else {
        void openChapter(id);
      }
    });
    if (startLesson !== null) {
      if (startLesson.includes("/")) {
        await openLesson(startLesson);
      } else {
        await openChapter(startLesson);
      }
    }
    return;
  }

  popoutOpen = (await window.runner.popoutState()).open;
  appState = await window.runner.getState();
  await loadSidebar();
}

void start();
