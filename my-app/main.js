const { app, BrowserWindow, ipcMain, dialog } = require("electron");

class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    };
    // const finalConfig = Object.assign(basicConfig, config);
    const finalConfig = { ...basicConfig, ...config };
    super(finalConfig);
    this.loadURL(fileLocation);
    this.once("ready-to-show", () => {
      this.show();
    });
  }
}

app.on("ready", () => {
  // require("devtron").install();
  let mainWindow = new AppWindow({}, "http://localhost:3001/");
  // mainWindow.loadURL("http://localhost:3001/");
  mainWindow.webContents.openDevTools();
  ipcMain.on("message", (event, arg) => {
    console.log(arg);
    event.reply("reply", "next hello electron");
  });

  ipcMain.on("add-music-window", (event, arg) => {
    console.log("hello add-music");
    const addWindow = new AppWindow(
      {
        width: 500,
        height: 400,
        parent: mainWindow,
      },
      "http://localhost:3001/addMusic"
    );
    // addWindow.webContents.openDevTools();
    // addWindow.loadURL("http://localhost:3001/addMusic");
  });

  ipcMain.on("chioce-music-window", (event, arg) => {
    console.log("hello chioce-music");
    dialog
      .showOpenDialog({
        properties: ["openFile", "multiSelections"],
        filters: [{ name: "music", extensions: ["mp3"] }],
      })
      .then((files) => {
        console.log(123456);
        console.log(files);
        event.sender.send("selectFile", files.filePaths);
        // BrowerWindow.webContents.send("select-file", files.filePaths);
      });
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
