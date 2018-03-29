import React, {PureComponent} from 'react'
import './style.scss'
import { Icon } from 'antd'
import { footerText } from '../../common/data'

class Footer extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={`footer ${this.props.className || ''}`}>
                <div className="copyright">
                    Copyright&nbsp;
                    <Icon type="copyright" />
                    &nbsp;{footerText}
                </div>
            </div>
        )
    }
}

export default Footer;