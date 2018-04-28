# react+router+redux+antd 后台管理系统框架

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
