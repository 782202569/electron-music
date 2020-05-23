const { app, BrowserWindow, ipcMain } = require("electron");

app.on("ready", () => {
  require("devtron").install();
  let mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      nodeIntegration: true, // 乐意使用nodejs的api
    },
  });
  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools();
  ipcMain.on("message", (event, arg) => {
    console.log(arg);
    event.reply("reply", "next hello electron");
  });

  // let secondWindow = new BrowserWindow({
  //  width: 400,
  //  height: 300,
  //  webPreferences: {
  //    nodeIntegration: true
  //  },
  //  parent: mainWindow
  //})
  //secondWindow.loadFile('second.html')
});
