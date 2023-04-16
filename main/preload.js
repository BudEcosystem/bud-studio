import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("app", {
  // Add any necessary Electron APIs here
  getPath: (name) => ipcRenderer.invoke("app-get-path", name),
});
