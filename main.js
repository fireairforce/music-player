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
    mainWindow.loadFile('./index.html');
    //  用这边来监听renderer那边的值
    ipcMain.on('message',(e,arg) => {
        console.log(arg);
        // 可以在event里面利用发送者这个属性往渲染进程上再回复一组数据
        e.sender.send('reply','hello from main')
        mainWindow.send('reply','hello from main')  
    })
  })