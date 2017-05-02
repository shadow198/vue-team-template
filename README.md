#vue team template 
###作者：月下独奏

这里只是提供一种构建vue项目的选择方案，如果喜欢欢迎Star

这里整合gulp的主要好处就是可以让webpack专注与vue file的模块打包，而不再考虑图片、css等非js文件

脚手架整合：babel+gulp+webpack+browserSync
前端整合：vue+vue-router+vuex+vuex-router-sync+axios+jquery+boostrap

---------------------
dir:
- build:打包脚手架文件夹
- config:打包目录配置文件夹
- dist:测试站打包文件夹
- src:项目文件开发文件夹
    - assets:公共资源
    - components:组件
    - directives:指令
    - filters:过滤器
    - router:路由
    - serves:服务
    - store:商店
    - styles:公共样式
    - utils:工具
    - views:视图（视图用lazyLoading进行加载）
- .babelrc:babel脚手架配置文件ES6语法支持文件
- .gitignore:git上传忽略文件配置文件
- gulpfile.babel.js:gulp脚本任务babel版文件
- index.html:本地开发环境运行首页
- tpl.html:开发首页模版
- package.json:依赖文件
- README.md:项目说明

----------------------------
#####项目依赖环境：
- node 6.x
- npm 3.x
- webpack 2.x
- browser-sync 2.x
- gulp 4.0(http://gulpjs.com/)
------------------------------
#####项目命令
- 安装依赖：`npm install`
- 启动服务：`gulp dev:serve`
- 编译打包：`gulp build`
- 本地启动服务查看打包项目：`gulp build:serve`