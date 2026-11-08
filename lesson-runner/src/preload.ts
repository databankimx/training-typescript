// The preload script. A sandboxed preload runs as plain JavaScript, so this file has no import or export statements.
// It exposes a small, fixed set of functions to the window, and nothing else from Node or Electron.

const electron = require("electron") as typeof import("electron");

electron.contextBridge.exposeInMainWorld("runner", {
  listParts: () => electron.ipcRenderer.invoke("catalogue:list"),
  refreshParts: () => electron.ipcRenderer.invoke("catalogue:refresh"),
  openLesson: (id: string) => electron.ipcRenderer.invoke("lesson:open", id),
  openChapter: (name: string) => electron.ipcRenderer.invoke("chapter:open", name),
  highlight: (code: string) => electron.ipcRenderer.invoke("code:highlight", code),
  solution: (id: string) => electron.ipcRenderer.invoke("lesson:solution", id),
  run: (id: string, code: string) => electron.ipcRenderer.invoke("run:start", id, code),
  sendInput: (text: string) => electron.ipcRenderer.invoke("run:input", text),
  stopRun: () => electron.ipcRenderer.invoke("run:stop"),
  check: (id: string, code: string) => electron.ipcRenderer.invoke("check:run", id, code),
  popOutLesson: (id: string) => electron.ipcRenderer.invoke("lesson:popout", id),
  syncPopout: (id: string) => electron.ipcRenderer.invoke("popout:sync", id),
  redock: () => electron.ipcRenderer.invoke("popout:redock"),
  popoutState: () => electron.ipcRenderer.invoke("popout:state"),
  getState: () => electron.ipcRenderer.invoke("state:get"),
  saveProgress: (id: string, progress: unknown) => electron.ipcRenderer.invoke("state:saveProgress", id, progress),
  saveLast: (id: string) => electron.ipcRenderer.invoke("state:saveLast", id),
  resetProgress: () => electron.ipcRenderer.invoke("state:reset"),
  onProgressReset: (callback: () => void) => {
    electron.ipcRenderer.on("progress:reset", () => callback());
  },
  onRunEvent: (callback: (event: unknown) => void) => {
    electron.ipcRenderer.on("run:event", (_event, value) => callback(value));
  },
  onPopoutState: (callback: (state: { open: boolean; lesson?: string }) => void) => {
    electron.ipcRenderer.on("popout:state", (_event, state) => callback(state));
  },
  onShowLesson: (callback: (id: string) => void) => {
    electron.ipcRenderer.on("lesson:show", (_event, id: string) => callback(id));
  },
});
