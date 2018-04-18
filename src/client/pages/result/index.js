import React, {PureComponent} from 'react'
import { Button } from 'antd'
import inject from '@inject'
import './style.scss'
import '../../mock/result'

@inject('base')
class result extends PureComponent {
    doAction = () => {
        this.props.userActions.saveStepInfo({text: 'test'});
    };
    getData = () => {
        React.$http.get('result')
            .then(res => {
                console.log(res.data.userList);
            })
    };
    render() {
        return (
            <div id="result">
                发生的发生地方放放风
                <Button onClick={this.getData}>getData</Button>
            </div>
        );
    }
}

export default result;
