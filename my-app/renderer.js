const { ipcRenderer } = require("electron");
const { BrowserWindow } = require("electron").remote;

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("node-version").innerHTML = process.versions.node;
  document.getElementById("send").addEventListener("click", () => {
    ipcRenderer.send("message", "hello electron!");
    let win = new BrowserWindow({ width: 800, height: 600 });
    win.loadURL("https://baidu.com");
  });
  ipcRenderer.on("reply", (event, arg) => {
    console.log(arg);
    document.getElementById("message").innerHTML = arg;
  });
});
