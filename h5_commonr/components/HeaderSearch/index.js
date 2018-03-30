import React, {PureComponent} from 'react'
import { PropTypes } from 'prop-types'
import { Icon, Input, AutoComplete, Row } from 'antd'
import classNames from 'classnames'

import './style.scss'

class HeaderSearch extends PureComponent {
    constructor(props) {
        super(props);
    }
    static defaultProps = {
        defaultActiveFirstOption: false,
        onPressEnter: () => {},
        onSearch: () => {},
        className: '',
        placeholder: '',
        dataSource: [],
        defaultOpen: false,
    };
    static propTypes = {
        className: PropTypes.string,
        placeholder: PropTypes.string,
        onSearch: PropTypes.func,
        onPressEnter: PropTypes.func,
        defaultActiveFirstOption: PropTypes.bool,
        dataSource: PropTypes.array,
        defaultOpen: PropTypes.bool,
    };
    state = {
        searchMode: !false,
        value: '',
    };
    onKeyDown = e => {
        if (e.key === 'Enter') {
            this.timeout = setTimeout(() => {
                this.props.onPressEnter(this.state.value); // Fix duplicate onPressEnter
            }, 0);
        }
    };
    onChange = value => {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange();
        }
    };
    enterSearchMode = () => {
        this.setState({ searchMode: true }, () => {
            if (this.state.searchMode) {
                this.input.focus();
            }
        });
    };
    leaveSearchMode = () => {
        this.setState({
            searchMode: false,
            value: '',
        });
    };

    render() {
        const inputClass = classNames('search-input', {
            'show': this.state.searchMode,
        });
        return (
            <span className='search-wrapper' onClick={this.enterSearchMode} >
                <Icon type='search'/>
                <AutoComplete
                    className={'search-input show'}
                    onSearch={this.props.handleSearchInput}
                    onSelect={this.props.handleOnSelect}
                    dataSource={this.props.dataSource}>
                    <Input
                        ref={node => this.input = node}
                        onKeyDown={this.onKeyDown}
                        onBlur={this.leaveSearchMode}/>
                </AutoComplete>

            </span>
        )
    }
}

export default HeaderSearch;