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

## 0.0.4
增加对CSS_MODULES的支持，
在package.json配置：CSS_MODULES，支持local，global，不配置，默认关闭CSS_MODULES支持