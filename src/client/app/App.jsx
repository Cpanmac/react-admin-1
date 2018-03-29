import React, {Component} from 'react'
import '../styles/index.scss'
import './style.scss'
import MLayout from '../layout'
import {Breadcrumb} from 'antd';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {routes, params} = this.props;
        return (
            <div id='app-container'>
                <MLayout>
                    <Breadcrumb separator="/" routes={routes} params={params}/>
                    {this.props.children}
                </MLayout>
            </div>
        )
    }
}


export default App;
