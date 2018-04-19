import { history } from '@react-router'

/**
 * 用户相关业务逻辑
 */
class User {
    // 登陆业务
    doLogin() {
        console.log('doLogin');
        this._saveLoginInfo();
    }
    _saveLoginInfo() {
        console.log('_saveLoginInfo');
    }
    // 登出业务
    doLogout() {
        history.push('/login');
        this._deleteLoginInfo();
    }
    _deleteLoginInfo() {
        console.log('_deleteLoginInfo');
    }
    // 检查登陆状态
    checkLoginStatus() {
        console.log('checkLoginStatus');
    }

}

export default new User();