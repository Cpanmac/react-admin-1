import React, {PureComponent} from 'react'
import { PropTypes } from 'prop-types'

import './style.scss'
import MenuSider from './MenuSider'
// import Footer from './Footer'
import Header from './Header'
import { footerText } from '../common/data'

import { Layout, Icon } from 'antd';
const { Content, Footer } = Layout;

class MLayout extends PureComponent {
    constructor(props) {
        super(props);
    }
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Layout
                style={{overflow:'auto'}}
                className='mlayout-wrapper wh100'>
                <MenuSider collapsed={this.state.collapsed}/>
                <Layout>
                    <Header
                        collapsed={this.state.collapsed}
                        toggle={this.toggle}
                        style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', height: 'auto' }}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Copyright&nbsp;
                        <Icon type="copyright" />
                        &nbsp;{footerText}
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default MLayout;