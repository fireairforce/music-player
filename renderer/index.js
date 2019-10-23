const { ipcRenderer } = require('electron');
const { $ } = require('./helper');
// 监听对应id值的dom节点上面的点击事件
$('add-music-button').addEventListener('click',()=>{
   ipcRenderer.send('add-music-window')
})