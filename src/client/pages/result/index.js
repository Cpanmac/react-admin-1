import React, {PureComponent} from 'react'
import inject from '@inject'
import './style.scss'

@inject('base')
class result extends PureComponent {
    constructor(props) {
        super(props);
    }
    doAction = () => {
        this.props.userActions.saveStepInfo({text: 'test'});
    };
    render() {
        return (
            <div id="result">
                result
                <button onClick={this.doAction}>test</button>
            </div>
        );
    }
}

export default result;
