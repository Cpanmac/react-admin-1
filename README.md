# react+router+redux+antd 后台管理系统框架

## 项目结构

    业务代码放在src/client下面

    /app 是外层容器

    /business 是放置复杂的业务逻辑（简单的业务逻辑在action中可以完成就无需放在此处
        权限管理模块放置在此文件夹中

    /common 放置公共配置，数据，业务等

    /iconfont 是图标文件夹

    /image 图片文件夹

    /layout 系统的UI布局，包括头部，脚部，菜单栏，登陆页面

    /mock mock数据文件夹

    /pages  业务页面，存放每个页面的style，action，reducer，components

    /redux 主要放置redux自动注入脚本和暴露对象配置

    /route 路由配置

    /service 调用API层

    /styles css样式工具 各个页面的样式也是放在各个page下的

    /utils 工具库

## 项目环境

    nodejs环境，windows直接在官网下载安装包安装，
    mac建议使用homebrew安装，也可以去node官网下在安装包安装
    
    ruby环境，windows直接下载安装包
    mac建议使用homebrew安装，也可以下载安装包安装

## 项目启动与打包

    第一次将项目拉到本地，
        需要先安装依赖（在项目根目录下运行： npm i 命令[这步骤比较慢，要等等]）
        依赖安装完成后再运行（npm run build:dll）

    本地启动项目:开发环境（npm run start)
    本地启动项目:生产环境（npm run start:prd)
    打测试包（npm run build:test）
    打生产包 (npm run build:prd)
