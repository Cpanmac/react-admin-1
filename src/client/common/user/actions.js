import {
    SAVE_STEP_INFO,
} from './constants'



const saveStepInfo = (param) => dispatch => {
    dispatch({
        type: SAVE_STEP_INFO,
        data: param,
    });
};
export {
    saveStepInfo,
};