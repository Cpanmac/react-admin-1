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
                发生的发生地方放放风
            </div>
        );
    }
}

export default result;
