// base lib
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { allReducer as allStates, allActions } from './index'

// 基础Redux 忽略大小写的匹配方式
const baseReduxConfig = ['user', 'app'];

const baseActions = getBaseRedux(allActions);
const baseStates = getBaseRedux(allStates);

/**
 * 根据 baseReduxConfig 中的配置创建正则表达式
 * 在allStates | allActions中匹配出对应的键
 * @param src allStates | allActions
 * @returns {{}}
 */
function getBaseRedux(src) {

    if(!baseReduxConfig.length) return {};
    let res = {};
    let reg = new RegExp(baseReduxConfig.join('|'), 'i');
    for(let i in src){
        if(src.hasOwnProperty(i) && reg.test(i)){
            res[i] = src[i];
        }
    }
    return res;
}

/**
 * 根据data创建 mapState 和 mapActions
 * @param data 比如：baseStates, allStates, baseActions, allActions
 * @param src 比如 mapState方法传入的state对象或者mapAction中传入的dispatch对象
 * @param type 'state' , 'action'
 * @returns {{}}
 * 逻辑：
 * 根据data中的键值对，创建相应的mapState和mapActions
 *
 * 根据下面的例子改写
 * const mapState = (state)=>{
 *  return {
 *      app:state.root.app,
 *      user:state.root.user,
 *  }
 * };
 *
 * const mapDispatch = (dispatch)=>{
 *  return {
 *      appActions: bindActionCreators(appActions,dispatch),
 *  }
 * };
 */
function creatRedux(data, src, type) {
    let res = {};
    for(let i in data) {
        if(data.hasOwnProperty(i)){
            res[i] = type === 'state' ? src.root[i] : bindActionCreators(data[i],src);
        }
    }
    return res;
}

/**
 * 往组件中注入state和action
 * @param options 支持多个参数
 *
 * 'base'|'common','self','all', customize(array)
 *
 * base:基础数据，app，user
 * self:自己的reducer & actions
 * all: 所有的reducer & actions 不推荐
 *
 * customize: 一个string array，用于注入指定的某些Redux,
 *            参数是有Redux页面的文件夹(在pages下面)名字,
 *            如:IdInfoAuth,AmountInfo...
 *
 * 在action和reducer不断增加的时候需要在下面的函数和上面的import依赖中添加
 *
 * 注意命名规范！！！
 * actions的命名如上，文件夹名+Actions
 */
export default function(options) {
    options = [...arguments];
    return function(component) {
        options = (options || ['self']).slice();
        let customize = [];
        // 提取定制化配置
        for(let i = 0; i < options.length; i++){
            let item = options[i];
            if(Array.isArray(item)) {
                customize = customize.concat(item);
                options.splice(i,1);
                i--;
            }
        }
        let componentName = component.name;
        if(!/self/.test(options)) {
            options = options.concat(['self']);
        }

        // 过滤处理state和action
        function filterRedux(basesrc, allsrc) {
            let reg = new RegExp(componentName, 'i');
            let res = {};
            if (/self/.test(options)){
                for(let i in allsrc){
                    if(allsrc.hasOwnProperty(i) && reg.test(i)){
                        res[i] = allsrc[i];
                    }
                }
            }
            if (/base|common/.test(options)){
                res = {
                    ...res,
                    ...basesrc,
                };
            }
            if (customize.length) {
                let reg_cust = new RegExp(customize.join('|'), 'i');
                for(let i in allsrc) {
                    if(allsrc.hasOwnProperty(i) && reg_cust.test(i)){
                        res[i] = allsrc[i];
                    }
                }
            }
            if(/all/.test(options)){
                return allsrc;
            } else if(Object.keys(res).length){
                return res;
            } else {
                return null;
            }
        }

        const mapState = state => {
            let _baseStates = creatRedux(baseStates, state, 'state');
            let _allStates = creatRedux(allStates, state, 'state');
            const res = filterRedux(_baseStates, _allStates);
            !res && console.error('没有找到可绑定的state');
            return res || {};
        };
        const mapDispatch = dispatch => {
            let _baseActions = creatRedux(baseActions, dispatch);
            let _allActions = creatRedux(allActions, dispatch);
            const res = filterRedux(_baseActions, _allActions);
            !res && console.error('没有找到可绑定的action');
            return res || {};
        };

        return connect(mapState, mapDispatch)(component);
    }
};



