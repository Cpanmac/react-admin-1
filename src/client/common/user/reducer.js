import * as types from './constants'

const initialState = {
    stepInfo: ''
};

const user = (state = initialState, { type, data })=>{
    switch(type){
        case types.SAVE_STEP_INFO:
            return { ...state, stepInfo: data };
        default:
            return state;
    }
};

export default user;