import * as type from './constants'
import { userService } from '@client/service'


const saveStepInfo = (param) => dispatch => {
    dispatch({
        type: type.SAVE_STEP_INFO,
        data: param,
    });
};

const getUserInfo = param => dispatch => {
    return userService.getUserInfo(param)
        .then(res => {
            const { userInfo } = res.data;
            dispatch({
                type: type.SAVE_USER_INFO,
                data: userInfo,
            });
        });

};

export {
    saveStepInfo,
    getUserInfo,
};