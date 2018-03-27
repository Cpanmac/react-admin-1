import React, {PureComponent} from 'react'
import './style.scss'
import { Icon } from 'antd'

class Footer extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='footer'>
                <div className="copyright">
                    Copyright&nbsp;
                    <Icon type="copyright" />
                    &nbsp;2018 中后台前端系统团队
                </div>
            </div>
        )
    }
}

export default Footer;