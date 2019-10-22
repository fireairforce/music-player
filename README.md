## Usage

首先修改了一波启动脚本:使用`nodemon`来完成对文件的`watch`.

```json
"scripts": {
   "start": "nodemon --watch main.js --exec 'electron .'"
},
```
只要`main.js`一旦发生变化，就会去执行`electron .`这个脚本命令。
