const { app, BrowserWindow } = require('electron');

// 表示electron已经完成加载好了，准备运行了
app.on('ready', ()=> {
   const mainWindow = new BrowserWindow({
     width: 800,
     height: 600,
     webPreferences: {
      //  表示我们在里面可以使用node的api
       nodeIntegration: true,
     }
   })
   mainWindow.loadFile('./index.html');
   const secondWindow = new BrowserWindow({
     width: 400,
     height: 300,
     webPreferences: {
       nodeIntegration: true,
     },
    //  父窗口属性，当父窗口关闭的时候，子窗口也会跟着关闭
     parent: mainWindow
   })
   secondWindow.loadFile('./second.html')
})