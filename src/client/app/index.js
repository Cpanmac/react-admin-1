import React, {PureComponent} from 'react'
import '../styles/index.scss'
import './style.scss'
import MLayout from '../layout'
import {Breadcrumb} from 'antd'
import UserBusiness from '../business/User'

class App extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        UserBusiness.checkLoginStatus();

        const {routes, params} = this.props;
        return (
            <div id='app-container'>
                <MLayout>
                    <Breadcrumb routes={[routes[0]]} params={params}/>
                    {this.props.children}
                </MLayout>
            </div>
        )
    }
}


export default App;
