import React, {PureComponent} from 'react'

import { Layout, Menu, Icon } from 'antd';
const { Header: AHeader, Content, Footer, Sider } = Layout;



class Header extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <AHeader style={{ background: '#fff', padding: 0 }} >
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
            </AHeader>
        );
    }
}

export default Header;