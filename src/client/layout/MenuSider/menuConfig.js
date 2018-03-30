import React from 'react'
import { Icon } from 'antd'

export default [
    {
        key: '1',
        icon: 'pie-chart',
        text: 'Login',
        link: '/login',
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
        },{
            key: 'sub2-3',
            title: <span><Icon type="team" /><span>Team</span></span>,
            children: [{
                key: 'sub2-3-1',
                text: 'Team 1',
            },{
                key: 'sub2-2-3',
                text: 'Team 2',
            }]
        },]
    },
    {
        key: '2',
        icon: 'file',
        text: 'file'
    },
];