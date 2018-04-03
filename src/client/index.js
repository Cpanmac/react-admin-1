import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router } from 'react-router';
import _history from '@history'
import { Provider } from 'react-redux';

import routes from './route/index'
import configureStore from './redux/store';
import './iconfont/iconfont.css'
import './utils/axiosInit'

let history = _history;


const store = configureStore(history);
// 创建一个增强版的history来结合store同步导航事件
history = syncHistoryWithStore(history,store);
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
