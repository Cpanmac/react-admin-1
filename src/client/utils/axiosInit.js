import axios from 'axios'
import React, {PureComponent, Component} from 'react'
import { serverUrl } from '../common/config'

// 服务端地址
axios.defaults.baseURL = serverUrl;
// 异步请求
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// json数据格式传输
axios.defaults.headers.common['Content-Type'] = 'application/json';

// 跨域时是否带上cookie
axios.defaults.withCredentials = true;
// 请求超时时间配置(ms)
axios.defaults.timeout = 20000;

// 请求拦截器
axios.interceptors.request.use(config => {
    // 请求之前，搞些事情
    return config;
}, error => {
    // 请求失败的时候，搞些事情
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(response => {
    // 服务端响应成功时，搞些事情
    return response;
}, error => {
    // 服务端响应失败时，搞些事情
    return Promise.reject(error);
});



let prop = {
    configurable: true,
    enumerable: false,
    value: axios,
    writable: false
};
// 将axios挂载到react对象和window对象上
Object.defineProperty(React, '$http', prop);
Object.defineProperty(React, 'axios', prop);
Object.defineProperty(window, 'axios', prop);
Object.defineProperty(window, '$http', prop);
