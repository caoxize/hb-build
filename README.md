# hb-build
hb打包，此包满足各种约定条件才可以使用，不用于一般使用
请将gulpfile.js拷贝至根目录下

## 0.0.3
目录结构：
在此目录下的入口文件，将自动打包，无需再指定entry
- rsrc
  - src
    - page
      - {module}
       - index.js
       - style.scss

如果在package.json内指定entry，将引用自定义的entry
