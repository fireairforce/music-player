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