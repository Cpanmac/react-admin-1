import React from 'react'
import { Icon } from 'antd'

const menuConfig = [
    {
        key: '01',
        icon: 'baidu',
        text: 'app',
        link: {
            pathname: '/',
            query: {
                id: 1,
            }
        },
        disabled: true,
    },
    {
        key: '1',
        icon: 'pie-chart',
        text: 'Login',
        link: {
            pathname: 'result',
            query: {
                id: 1,
            }
        }
    },
    {
        key: '1.1',
        icon: 'qq',
        text: 'result',
        link: 'result'
    },
    {
        key: 'sub1',
        title: <span><Icon type="user" /><span>User</span></span>,
        children: [{
            key: 'sub1-1',
            text: 'Tom',
        },{
            key: 'sub1-2',
            text: 'Bill',
        },{
            key: 'sub1-3',
            text: 'Alex',
        },]
    },
    {
        key: 'sub2',
        title: <span><Icon type="team" /><span>Team</span></span>,
        children: [{
            key: 'sub2-1',
            text: 'Team 1',
        },{
            key: 'sub2-2',
            text: 'Team 2',
        }]
    },
    {
        key: '2',
        icon: 'file',
        text: 'file'
    },
];

export default menuConfig;

const hasLinkMenus = [];
/**
 * 获取菜单中有link元素的菜单，整理成数组输出，主要用于给顶部搜索栏提供数据
 * @param menus
 */
const getHasLinkMenus = (menus) => {
    menus.forEach(menu => {
        if(!!menu.children) {
            getHasLinkMenus(menu.children);
        } else if(!!menu.link && !menu.disabled) {
            hasLinkMenus.push(menu);
        }
    })
};

getHasLinkMenus(menuConfig);
export {
    hasLinkMenus,
};

