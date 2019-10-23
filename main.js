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
    ipcMain.on('add-music-window',(e,arg)=>{
      console.log(`get it`);
      // 这里收到app.js那边传递过来的添加按钮之后，创建一个新的窗口
      const addWindow = new BrowserWindow({
        width: 500,
        height: 400,
        webPreferences: {
          nodeIntegration: true
        },
        parent: mainWindow
      })
      addWindow.loadFile('./renderer/add.html')
    })

  })