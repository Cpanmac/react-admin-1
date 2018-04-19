import React, {PureComponent} from 'react'
import { PropTypes } from 'prop-types'

import './style.scss'
import MenuSider from './MenuSider'
// import Footer from './Footer'
import Header from './Header'
import { footerText } from '../common/data'

import { Layout, Icon } from 'antd';
const { Content, Footer } = Layout;
const smallWindowWidth = 500;
class MLayout extends PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        collapsed: false,
    };
    /**
     * 根据当前窗口宽度展开，收缩菜单栏
     */
    autoToggleMenuByWindowSize = () => {
        const windowWidth = window.innerWidth;
        const { collapsed } = this.state;

        if(windowWidth < smallWindowWidth && !collapsed) {
            this.setState({
                collapsed: true,
            })
        } else if(windowWidth > smallWindowWidth && collapsed) {
            this.setState({
                collapsed: false,
            })
        }
    };

    componentDidMount() {
        this.autoToggleMenuByWindowSize();
    }

    componentWillMount() {
        window.addEventListener('resize', this.autoToggleMenuByWindowSize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.autoToggleMenuByWindowSize)
    }

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