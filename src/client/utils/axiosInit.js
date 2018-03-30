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

Object.defineProperty(React, '$http', prop);
Object.defineProperty(Component, '$http', prop);
Object.defineProperty(PureComponent, '$http', prop);

window.axios = axios;
