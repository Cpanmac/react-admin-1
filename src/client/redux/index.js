// base lib
import { combineReducers } from "redux"


// 导入 reducer
import user from '../common/user/reducer'

// 导入 actions
import * as userActions from '../common/user/actions'

// 将actions 加入自动导入对象
export const allActions = {
    userActions,
};

// 将reducer 加入自动注入对象
export const allReducer = {
    user,
};



const rootReducer = combineReducers(allReducer);

export default rootReducer;