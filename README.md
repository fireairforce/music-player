## Usage

首先修改了一波启动脚本:使用`nodemon`来完成对文件的`watch`.

```json
"scripts": {
   "start": "nodemon --watch main.js --exec 'electron .'"
},
```
只要`main.js`一旦发生变化，就会去执行`electron .`这个脚本命令。`main.js`使我们的主进程。

## 数据持久化的方式
- 使用数据库软件
- 使用html5提供的浏览器对象
- 使用本地文件

这里使用`electron-store`来对数据进行一个存储

可以使用
```js
// 这里能够打印出electron-store存储数据的文件目录位置
// console.log(app.getPath('userData'));
```

## 音乐播放
使用`html5`的`Audio`标签来完成音乐的播放:

```html
<audio
  controls 
  src="/media/examples/xxx.mp3"
>
</audio>   
```

对应的`js`对象:
```js
const horn = new Audio('car_horn.wav');
horn.play();
horn.pause();
horn.volume = 0.75;
horn.addEventListener('loadeddata', () => {
   let duration = horn.duration;
})
```

使用音乐的dom节点来存储`data信息`

- HTML 中使用自定义的`data`属性:`data-*`来存储
- JS中使用`HTMLElement`的`dataset`属性来获取(具体可以参考音乐播放那里)

事件的绑定上面我们使用事件的冒泡机制来完成事件的代理功能。

**遇见复杂的问题可以使用流程图来解决**