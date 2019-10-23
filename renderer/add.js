const { ipcRenderer } = require("electron");
const { $ } = require("./helper");
const path = require('path');
let musicFilesPath = [];
$("select-music").addEventListener("click", () => {
  ipcRenderer.send("open-music-file");
});

$('add-music').addEventListener('click', ()=> {
    // 添加新的音乐文件的事件
    ipcRenderer.send('add-tracks',musicFilesPath);
})

const renderListHTML = (pathes) => {
    const musicList = $('musiclist')
    const musicItemsHTML = pathes.reduce((html, music) => {
        html += `<li class="list-group-item">${path.basename(music)}</li>`
        return html;
    },'')
    musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`
}
ipcRenderer.on("select-file", (e, arg) => {
  if (Array.isArray(arg)) {
    renderListHTML(arg);
    musicFilesPath = arg;
  }
});
