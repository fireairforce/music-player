const { ipcRenderer } = require('electron');

// 监听对应id值的dom节点上面的点击事件
document.getElementById('add-music-button').addEventListener('click',()=>{
   ipcRenderer.send('add-music-window')
})