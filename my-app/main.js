const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const DataStore = require("./src/store/musicDataStore");
const Store = require("electron-store");
const myStore = new DataStore({ name: "Music Data" });
const store = new Store();

console.log(app.getPath("userData"));
// 获取这个地址 cd 地址
// ls
// vim config.json
//  :q返回
// app.getPath('userData') 存到这个里面的 vim config.json
store.set("unicorn", "🐎");
console.log(store.get("unicorn"));

store.set("foo.bar", "true");
console.log(store.get("foo"));

store.delete("unicorn");
console.log(store.get("unicorn"));
class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 1500,
      height: 1000,
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
  let mainWindow = new AppWindow({}, "http://localhost:3000/");
  mainWindow.webContents.on("did-finish-load", () => {
    console.log("did finisgh");
    mainWindow.send("getTracks", myStore.getTracks());
  });
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
      "http://localhost:3000/addMusic"
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

  ipcMain.on("add-tracks", (event, tracks) => {
    console.log(tracks);
    const updatedTracks = myStore.addTracks(tracks).getTracks();
    console.log(updatedTracks);
    mainWindow.send("getTracks", updatedTracks);
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
