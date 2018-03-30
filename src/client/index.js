import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory, Router } from 'react-router';

import routes from './route/index'
import { Provider } from 'react-redux';

import configureStore from './redux/store';
import './iconfont/iconfont.css'


const store = configureStore(hashHistory);
// 创建一个增强版的history来结合store同步导航事件
const history = syncHistoryWithStore(hashHistory,store);
const rootElement = document.getElementById('app');

const render = () => {
    ReactDOM.render(
        // 利用Provider可以使我们的 store 能为下面的组件所用
        <Provider store={store}>
            <Router routes={routes} history={history} />
        </Provider>,
        rootElement
    );
};

render();

if(module.hot){
    module.hot.accept('./app/index', () => {
        ReactDOM.unmountComponentAtNode(rootElement);
        render();
    })
}
