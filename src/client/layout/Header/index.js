import React, {PureComponent} from 'react'
import { Link } from 'react-router'
import inject from '@inject'
import './style.scss'
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';

@inject('base')
class Header extends PureComponent {
    state = {
        menuConfig: [
            {
                key: '0',
                disabled: true,
                icon: 'user',
                text: ' 个人中心',
            },{
                key: '1',
                disabled: true,
                icon: 'setting',
                text: ' 设置',
            },{
                key: '2',
                isDivider: true,
            },{
                key: '3',
                icon: 'logout',
                text: ' 登出',
                link: '/login'
            },
        ],
    };
    renderMenuItem = menu => {
        const menuItemProps = {key: menu.key};
        menu.disabled && (menuItemProps['disabled'] = true);
        if(!!menu.link) {
            return (
                <Menu.Item {...menuItemProps}>
                    <Link to={menu.link}>
                        {menu.icon?<Icon type={menu.icon} />:''}
                        {menu.text?<span>{menu.text}</span>:''}
                    </Link>
                </Menu.Item>
            );
        } else if(menu.isDivider) {
            return <Menu.Divider key={menu.key}/>;
        } else {
            return (
                <Menu.Item {...menuItemProps}>
                    {menu.icon?<Icon type={menu.icon} />:''}
                    {menu.text?<span>{menu.text}</span>:''}
                </Menu.Item>
            );
        }

    };
    renderMenu = menu => {
        if(!!menu.children) {
            return (
                <SubMenu key={menu.key} title = {menu.title}>
                    {
                        menu.children.map(smenu => {
                            if(!!smenu.children){
                                return this.renderMenu(smenu);
                            } else {
                                return this.renderMenuItem(smenu);
                            }
                        })
                    }
                </SubMenu>
            )
        }
        return this.renderMenuItem(menu);
    };
    render() {
        const menuEle = (
            <Menu>{ this.state.menuConfig.map(menu => this.renderMenu(menu)) }</Menu>
        );
        const { avatar, username } = this.props.user;
        return (
            <Layout.Header className='mheader' >
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle} />

                <Dropdown overlay={menuEle} placement="bottomRight">
                    <div className='avatar-wrapper'>
                        {!!avatar? <Avatar src={avatar}/> : <Avatar icon='user'/> }
                        <span>&nbsp;&nbsp;{username}</span>
                    </div>
                </Dropdown>
            </Layout.Header>
        );
    }
}

export default Header;