const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const DataStore = require('./renderer/musicDataStore');
const myStore = new DataStore();

class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const baseConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        //  表示我们在里面可以使用node的api
        nodeIntegration: true,
      },
    }
    // 这里可以使用我们自定的config来覆盖一波默认的basicConfig
    // const finalConfig = Object.assign(baseConfig, config);
    const finalConfig = { ...baseConfig,...config }
    super(finalConfig);
    this.loadFile(fileLocation);
    this.once('ready-to-show', () => {
      this.show();
    })
  }
}
// 表示electron已经完成加载好了，准备运行了
app.on("ready", () => {
  const mainWindow = new AppWindow({},"./renderer/index.html");
  // mainWindow.loadFile("./renderer/index.html");
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('getTracks', myStore.getTracks());
  })

  ipcMain.on("add-music-window", () => {
    // 这里收到app.js那边传递过来的添加按钮之后，创建一个新的窗口
    const addWindow = new AppWindow({
      width: 500,
      height: 400,
      parent: mainWindow,
    },"./renderer/add.html");
  });
  // 在这里接受到传递过来的数据，然后用electron-store存储起来
  ipcMain.on('add-tracks',(e,arg) => {
    // console.log(arg);
    const updatedTracks = myStore.addTracks(arg).getTracks();
    // 拿到数据之后渲染到mainWindow里面
    mainWindow.send('getTracks',updatedTracks)
  })
  ipcMain.on('open-music-file', (e,arg) => {
    // 主渲染进程这边接收选择音乐消息后,使用electron的api打开一个获取文件的弹窗
    dialog.showOpenDialog({
      // 这里设置打开文件的属性 
      properties:['openFile', 'multiSelections'],
      // 选择的文件的类型
      filters: [{ name:'Music', extensions: ['mp3']}]
    }, (files) => {
      if(files) {
        // 把选择到的文件数据传递到add.js那边去
        e.sender.send('select-file',files);
      }
    })
  })
  ipcMain.on('delete-track',(e,id) => {
     const updatedTracks = myStore.deleteTracks(id).getTracks()
    //  将删除完成的信息发送回去
     mainWindow.send('getTracks',updatedTracks);
  })
});
