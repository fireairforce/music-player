  const { app, BrowserWindow, ipcMain } = require('electron');

  // 表示electron已经完成加载好了，准备运行了
  app.on('ready', ()=> {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        //  表示我们在里面可以使用node的api
        nodeIntegration: true,
      },
    })
    mainWindow.loadFile('./renderer/index.html');
  })