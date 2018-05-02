import * as type from './constants'
import { history } from '@react-router'
import { userService } from '@client/service'

// 获取用户信息
const getUserInfo = param => dispatch => {
    return userService.getUserInfo(param)
        .then(res => {
            const { userInfo } = res.data;
            // 保存用户的权限
            dispatch({
                type: type.SAVE_USER_INFO,
                data: userInfo,
            });
        });
};
// 登陆业务
const doLogin = param => dispatch => {
    console.log('doLogin');
    // todo: 保存登陆信息;
};
const saveLoginInfo = param => dispatch => {
    console.log('_saveLoginInfo');
};
// 登出业务
const doLogout = param => dispatch => {
    history.push('/login');
    // todo: 删除登陆状态
};
const deleteLoginInfo = param => dispatch => {
    console.log('_deleteLoginInfo');
};
// 检查登陆状态
const checkLoginStatus = param => dispatch => {
    console.log('checkLoginStatus');
};


export {
    getUserInfo,
    doLogin,
    saveLoginInfo,
    doLogout,
    deleteLoginInfo,
    checkLoginStatus,
};