# react+router+redux+antd 后台管理系统框架

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

## 淘宝镜像使用

    命令行运行:npm install -g cnpm --registry=https://registry.npm.taobao.org
    设置完成后，之前使用npm i 的命令就可以使用cnpm i去执行，使用国内服务器会快点

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

## 如何使页面看到

    在你写完page之后，需要将你的page添加到路由和菜单中
    添加到路由：在/route>index.js 中，将页面添加到你需要的地方[一般是添加到app>childRoutes中]
    添加到菜单：在/layout>MenuSider>menuConfig.js 定义好你用的菜单属性key，icon，text，link（page在路由中配置的path值）

## 使用redux

    在项目的页面中，有page模板，每一个page文件中有actions和reducer,constants（可以参考/common>/user中的模板）
    想要使用这些actions和reducer数据，得先将actions和reducer暴露出来
    在/redux/index.js中导入actions和reducer并添加进allActions和allReducer中
    然后在页面中引入'@inject'依赖，然后使用注解的方式[@inject('base')]导入你需要的redux

    注：@inject('base')是导入app和user部分的redux，你还可以写成@inject(['app', 'user'])
        自动注入的脚本是按照忽略大小写的正则匹配算法实现的，所以一旦有匹配的redux就会注入


## 使用mock数据

    mock数据使用了mockjs依赖，在你写好一个页面的mock后（mock文件放在/mock中），
    将其引入到页面，页面中的请求就会自动匹配拦截，不引入就不会使用mock数据
    mockjs支持使用简单的语法模板去生成数据，具体语法可以参考mockjs官网文档

## 服务端需要的设置

    框架默认使用的是browserHistory的单页面应用，所以在服务端需要设置将所以的路由都跳转到index.html页面
    建议服务端开启gzip压缩，提高用户体验