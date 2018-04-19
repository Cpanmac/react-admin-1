import React, {PureComponent} from 'react'
import { history, Link } from '@react-router'
// import HeaderSearch from 'HeaderSearch'
import classNames from 'classnames'
import inject from '@inject'
import './style.scss'
import { Layout, Menu, Icon, Dropdown, Avatar, Input, Row, AutoComplete } from 'antd';
import { getHasLinkMenus } from '../MenuSider/menuConfig'
import accountMenuConfig from './accountMenuConfig'

let hasLinkMenusTexts;
let hasLinkMenus;

@inject('base')
class Header extends PureComponent {
    state = {
        menuConfig: accountMenuConfig,
        dataSource: [],
        searchMode: false,
    };

    componentWillMount() {
        this.initHasLinkMenusTexts();
        this.props.userActions.getUserInfo();
    }
    initHasLinkMenusTexts = () => {
        hasLinkMenus = getHasLinkMenus();
        hasLinkMenusTexts = hasLinkMenus.map(menu => menu.text);
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

    // 以下方法是搜索框的
    handleSearchInput = value => {
        if(!value) return;
        const reg = new RegExp(value, 'i');
        const dataSource = hasLinkMenusTexts.filter(menu => reg.test(menu));
        this.setState({ dataSource });
    };
    handleOnSelect = value => {
        const selectedMenu = hasLinkMenus.find(menu => menu.text === value);
        if(selectedMenu && selectedMenu.link) {
            history.push(selectedMenu.link);
        }
    };
    onKeyDown = e => {
        if (e.key === 'Enter') {
            this.timeout = setTimeout(() => {
                // this.props.onPressEnter(this.state.value); // Fix duplicate onPressEnter
            }, 0);
        }
    };
    onChange = value => {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange();
        }
    };
    enterSearchMode = () => {
        this.setState({ searchMode: true }, () => {
            if (this.state.searchMode) {
                this.input.focus();
            }
        });
    };
    leaveSearchMode = () => {
        this.setState({
            searchMode: false,
            value: '',
        });
    };

    render() {
        const menuEle = (
            <Menu>{ this.state.menuConfig.map(menu => this.renderMenu(menu)) }</Menu>
        );
        const { avatar, username } = this.props.user;
        let avatarProps = !!avatar ? { src: avatar } : { icon: 'user' };
        const inputClass = classNames('search-input', {
            'show': this.state.searchMode,
        });
        return (
            <Layout.Header className='mheader' >
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle} />

                <Row className='search-wrapper' onClick={this.enterSearchMode}>
                    <Icon type='search'/>
                    <AutoComplete
                        className={inputClass}
                        onSearch={this.handleSearchInput}
                        onSelect={this.handleOnSelect}
                        dataSource={this.state.dataSource}>
                        <Input
                            ref={node => this.input = node}
                            onKeyDown={this.onKeyDown}
                            onBlur={this.leaveSearchMode}/>
                    </AutoComplete>
                </Row>

                <Dropdown overlay={menuEle} placement="bottomRight">
                    <div className='avatar-wrapper'>
                        <Avatar {...avatarProps}/>
                        <span>&nbsp;&nbsp;{username}</span>
                    </div>
                </Dropdown>
            </Layout.Header>
        );
    }
}

export default Header;