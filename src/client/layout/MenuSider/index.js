import React, {PureComponent} from 'react'
import './style.scss'
import { hashHistory } from 'react-router'


import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;


class MenuSider extends PureComponent {
    state = {
        MenuConfig: [
            {
                key: '1',
                icon: 'pie-chart',
                text: 'Login',
                onClick: () => {
                    console.log('2333');
                    hashHistory.push('/login');
                },
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
        ],
    };
    renderMenu = (menu) => {
        if(!!menu.children) {
            return (
                <SubMenu key={menu.key} title = {menu.title}>
                    {
                        menu.children.map(smenu => {
                            if(!!smenu.children){
                                return this.renderMenu(smenu);
                            } else {
                                return (
                                    <Menu.Item key={smenu.key}>
                                        <span onClick={smenu.onClick || null}>
                                            {smenu.icon?<Icon type={smenu.icon} />:''}
                                            {smenu.text?<span>{smenu.text}</span>:''}
                                        </span>
                                    </Menu.Item>
                                );
                            }
                        })
                    }
                </SubMenu>
            )
        }
        return (
            <Menu.Item key={menu.key} onClick={menu.onClick || null}>
                <span onClick={menu.onClick || null}>
                    {menu.icon?<Icon type={menu.icon} />:''}
                    {menu.text?<span>{menu.text}</span>:''}
                </span>
            </Menu.Item>
        );
    };
    render() {
        return (
            <Sider
                style={{ overflow: 'auto', height: '100%', left: 0 }}
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}>
                <div className="logo" />

                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {
                        this.state.MenuConfig.map(menu => this.renderMenu(menu))
                    }
                    {/*<Menu.Item key="1">*/}
                        {/*<Icon type="pie-chart" />*/}
                        {/*<span>Option 1</span>*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="2">*/}
                        {/*<Icon type="desktop" />*/}
                        {/*<span>Option 2</span>*/}
                    {/*</Menu.Item>*/}
                    {/*<SubMenu*/}
                        {/*key="sub1"*/}
                        {/*title={<span><Icon type="user" /><span>User</span></span>} >*/}
                        {/*<Menu.Item key="3">Tom</Menu.Item>*/}
                        {/*<Menu.Item key="4">Bill</Menu.Item>*/}
                        {/*<Menu.Item key="5">Alex</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*<SubMenu*/}
                        {/*key="sub2"*/}
                        {/*title={<span><Icon type="team" /><span>Team</span></span>} >*/}
                        {/*<Menu.Item key="6">Team 1</Menu.Item>*/}
                        {/*<Menu.Item key="8">Team 2</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*<Menu.Item key="9">*/}
                        {/*<Icon type="file" />*/}
                        {/*<span>File</span>*/}
                    {/*</Menu.Item>*/}
                </Menu>
            </Sider>
        );
    }
}

export default MenuSider;