import React from 'react'
import { Icon } from 'antd'
import Authority from '@client/business/Authority'

const menuConfig = [
    {
        key: '01',
        icon: 'apple',
        text: 'app',
        link: {
            pathname: '/',
            query: {
                id: 1,
            }
        },
        disabled: false,
    },
    {
        key: '1',
        icon: 'pie-chart',
        text: 'Login',
        disabled: true,
        link: {
            pathname: '/login',
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
            link: {
                pathname: 'result',
                query: {
                    id: 'Tom',
                }
            },
        },{
            key: 'sub1-2',
            text: 'Bill',
            link: {
                pathname: 'result',
                query: {
                    id: 'Bill',
                }
            },
        },{
            key: 'sub1-3',
            text: 'Alex',
            link: {
                pathname: 'result',
                query: {
                    id: 'Alex',
                }
            },
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

const getHasLinkMenus = () => {
    const hasLinkMenus = [];

    /**
     * 获取菜单中有link元素的菜单元素，放到数组中，
     * 主要用于给顶部搜索栏提供数据
     * @param menus
     */
    const putHasLinkMenusBy = menus => {
        menus.forEach(menu => {
            if(!!menu.children) {
                putHasLinkMenusBy(menu.children);
            } else if(!!menu.link && !menu.disabled && Authority.isCurrentUserHasAuth(menu)) {
                hasLinkMenus.push(menu);
            }
        });
    };

    putHasLinkMenusBy(menuConfig);
    return hasLinkMenus;
};

export {
    getHasLinkMenus
};

