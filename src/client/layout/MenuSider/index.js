import React, {PureComponent} from 'react'
import './style.scss'
import { Link } from '@react-router'
import Authority from '@client/business/Authority'
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
        const AuthorityMenuItemHOC = Authority.createAuthorityFilterHOC(Menu.Item);
        if(!!menu.link) {
            return (
                <AuthorityMenuItemHOC {...menu}>
                    <Link to={menu.link}>
                        {menu.icon?<Icon type={menu.icon} />:''}
                        {menu.text?<span>{menu.text}</span>:''}
                    </Link>
                </AuthorityMenuItemHOC>
            );
        }
        return (
            <AuthorityMenuItemHOC {...menu}>
                {menu.icon?<Icon type={menu.icon} />:''}
                {menu.text?<span>{menu.text}</span>:''}
            </AuthorityMenuItemHOC>
        );
    };
    renderMenu = menu => {
        const AuthoritySubMenuHOC = Authority.createAuthorityFilterHOC(SubMenu);
        const { children, ...rest } = menu;
        if(!!children) {
            return (
                <AuthoritySubMenuHOC {...rest}>
                    {
                        menu.children.map(smenu => {
                            if(!!smenu.children){
                                return this.renderMenu(smenu);
                            } else {
                                return this.renderMenuItem(smenu);
                            }
                        })
                    }
                </AuthoritySubMenuHOC>
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
                <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
                    {this.state.MenuConfig.map(menu => this.renderMenu(menu))}
                </Menu>
            </Sider>
        );
    }
}

export default MenuSider;