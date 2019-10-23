const { ipcRenderer } = require("electron");
const { $ } = require("./helper");
const path = require('path');

$("select-music").addEventListener("click", () => {
  ipcRenderer.send("open-music-file");
});

const renderListHTML = (path) => {
    const musicList = $('musiclist')
    const musicItemsHTML = path.reduce((html, music) => {
        html += `<li class="list-group-item">${path.basename(music)}</li>`
        return html;
    },'')
    musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`
}
ipcRenderer.on("select-file", (e, arg) => {
  if (Array.isArray(arg)) {
    renderListHTML(arg);
  }
});
