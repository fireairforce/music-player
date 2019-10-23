const { ipcRenderer } = require("electron");
const { $ } = require("./helper");
// 监听对应id值的dom节点上面的点击事件
$("add-music-button").addEventListener("click", () => {
  ipcRenderer.send("add-music-window");
});

const renderListHTML = (tracks) => {
  const tracksList = $("tracksList");
  const tracksListHTML = tracks.reduce((html, track) => {
    html += `<li class="row music-track list-group-item d-flex justify-content-between aligin-items-center">
           <div class="col-10">
             <i class="fas fa-music mr-2"></i>
             <b>${track.fileNames}</b>
           </div>
           <div class="col-2">
             <i class="fas fa-play mr-3"></i>
             <i class="fas fa-trash-alt"></i>            
           </div>
        </li>`;
    return html;
  }, "");
  const emptyHtml = `<div class="alert alert-primary">还没添加任何音乐</div>`;
  tracksList.innerHTML = tracks.length
    ? `<ul class="list-group">${tracksListHTML}</ul>`
    : emptyHtml;
};
ipcRenderer.on("getTracks", (e, arg) => {
  // 这里就拿到store里面的存储数据了
  console.log(`receive tracks`, arg);
  renderListHTML(arg);
});
