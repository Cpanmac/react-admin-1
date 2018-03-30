import React, {PureComponent} from 'react'
import './style.scss'
import { Link } from 'react-router'
import menuConfig from './menuConfig'

import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;


class MenuSider extends PureComponent {
    state = {
        MenuConfig: menuConfig,
    };
    renderMenuItem = menu => {
        const menuItemProps = { key: menu.key };
        menu.disabled && (menuItemProps['disabled'] = true);
        if(!!menu.link) {
            return (
                <Menu.Item {...menu}>
                    <Link to={menu.link}>
                        {menu.icon?<Icon type={menu.icon} />:''}
                        {menu.text?<span>{menu.text}</span>:''}
                    </Link>
                </Menu.Item>
            );
        }
        return (
            <Menu.Item {...menu}>
                {menu.icon?<Icon type={menu.icon} />:''}
                {menu.text?<span>{menu.text}</span>:''}
            </Menu.Item>
        );
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
        return (
            <Sider
                style={{ overflow: 'auto', height: '100%', left: 0 }}
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {this.state.MenuConfig.map(menu => this.renderMenu(menu))}
                </Menu>
            </Sider>
        );
    }
}

export default MenuSider;