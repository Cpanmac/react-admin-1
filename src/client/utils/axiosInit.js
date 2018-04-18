import axios from 'axios'
import React, {PureComponent, Component} from 'react'
import { serverUrl } from '../common/config'

axios.defaults.baseURL = serverUrl;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

let prop = {
    configurable: true,
    enumerable: false,
    value: axios,
    writable: false
};
// 挂载到react对象和window对象上
Object.defineProperty(React, '$http', prop);
Object.defineProperty(React, 'axios', prop);
Object.defineProperty(window, 'axios', prop);
Object.defineProperty(window, '$http', prop);
