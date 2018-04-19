import * as types from './constants'

const initialState = {
    stepInfo: '',
    avatar: '',
    username: 'admin'
};

const user = (state = initialState, { type, data })=>{
    switch(type){
        case types.SAVE_STEP_INFO:
            return { ...state, stepInfo: data };
        case types.SAVE_USER_INFO:
            return { ...state, ...data };
        default:
            return state;
    }
};

export default user;