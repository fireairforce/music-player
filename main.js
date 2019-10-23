const { app, BrowserWindow, ipcMain } = require("electron");

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
  ipcMain.on("add-music-window", () => {
    // 这里收到app.js那边传递过来的添加按钮之后，创建一个新的窗口
    const addWindow = new AppWindow({
      width: 500,
      height: 400,
      parent: mainWindow,
    },"./renderer/add.html");
  });
});
