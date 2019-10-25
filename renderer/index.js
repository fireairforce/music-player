const { ipcRenderer } = require("electron");
const { $ } = require("./helper");
let musicAudio = new Audio();
let allTracks;
let currentTrack;
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
             <i class="fas fa-play mr-3" data-id="${track.id}"></i>
             <i class="fas fa-trash-alt" data-id="${track.id}"></i>            
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
  // console.log(`receive tracks`, arg);
  allTracks = arg;
  renderListHTML(arg);
});

// 为播放器添加点击播放和暂停的事件
$("tracksList").addEventListener("click", (e) => {
  e.preventDefault();
  const { dataset, classList } = e.target;
  const id = dataset && dataset.id;
  if (id && classList.contains("fa-play")) {
    // 这里播放音乐
    if (currentTrack && currentTrack.id === id) {
      // 继续播放音乐
      musicAudio.play();
    } else {
      // 播放新的歌曲并还原之前的项目
      currentTrack = allTracks.find((item) => item.id === id);
      musicAudio.src = currentTrack.path;
      musicAudio.play();
      const resetIconEle = document.querySelector('.fa-pause');
      if(resetIconEle) {
        resetIconEle.classList.replace('fa-pause','fa-play');
      }
    }
    //　开始播放状态
    classList.replace("fa-play", "fa-pause");
  } else if (id && classList.contains("fa-pause")) {
    // 这里处理暂停逻辑
    musicAudio.pause();
    classList.replace("fa-pause", "fa-play");   
  } else if (id && classList.contains("fa-trash-alt")) {
    // 这里发送消息　删除这条音乐
    ipcRenderer.send('delete-track',id);
  }
});
