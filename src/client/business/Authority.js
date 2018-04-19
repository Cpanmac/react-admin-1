import React, {PureComponent} from 'react'
import inject from '@inject'
import { store } from '../index'

/**
 * 权限模块
 */
class Authority {
    /**
     * 创建权限过滤器高阶组件
     * 控制需要权限验证模块的权限验证，
     * 如果用户有权限就显示该模块，
     * 没有就不显示。
     * @param WrappedComponent 需要控制权限的组件
     * @returns {AuthorityFilterHOC}
     * @constructor
     */
    createAuthorityFilterHOC(WrappedComponent) {
        const _this = this;

        @inject(['user'])
        class AuthorityFilterHOC extends PureComponent {
            state = {
                hasAuth: true,
            };
            componentWillMount() {
                this.setState({
                    hasAuth: _this.isCurrentUserHasAuth(this.props),
                })
            }
            render() {
                const { hasAuth } = this.state;
                return hasAuth ? <WrappedComponent { ...this.props }/> : null;
            }
        }
        return AuthorityFilterHOC;
    };

    /**
     * 获取当前用户权限
     * @returns {*}
     */
    getCurrentUserAuthority() {
        const userStore = store.getState().root.user;
        const currentUserAuth = userStore.authority;
        return currentUserAuth;
    }
    /**
     * 判断用户是否有权限
     * @param params
     * @returns {boolean}
     */
    isCurrentUserHasAuth(params) {
        // const userAuth = this.getCurrentUserAuthority();
        return true;
    };
}

export default new Authority();