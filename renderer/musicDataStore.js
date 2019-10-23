const Store = require('electron-store');
const uuidv4 = require('uuid/v4');
const path = require('path');

class DataStore extends Store {
    constructor(settings) {
        super(settings);
        this.tracks = this.get('track') || [];
    }
    saveTracks() {
        // 存储数据
        this.set('track',this.tracks);
        return this;
    }
    getTracks() {
        // 获取到数据
        return this.get('track') || [];
    }
    addTracks(tracks) {
      //    用来存储歌曲信息
        const trackWithProps = tracks.map(item => {
            return {
                id: uuidv4(),
                path: item,
                fileNames: path.basename(item)
            }
        }).fileter(item=> {
            const currentTracksPath = this.getTracks().map(item => item.path);
            return currentTracksPath.indexOf(item.path) < 0;
        }) 
        this.tracks = [...this.tracks, ...trackWithProps];
        return this.saveTracks();
    } 
}

module.exports = DataStore;