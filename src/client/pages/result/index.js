import React, {PureComponent} from 'react'
import { Button, Table, Pagination } from 'antd'
import inject from '@inject'
import './style.scss'
import '../../mock/result'
import '../../mock/user'

import { resultService } from '../../service'

@inject('base')
class result extends PureComponent {

    state = {
        dataSource: [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 10*10,
        }
    };
    columns = [{
        title: '#',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    }, {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    }];

    componentWillMount() {
        this.getData();
    }
    getData = params => {
        let { pagination } = this.state;
        if(params === undefined) params = this.state.pagination;
        pagination = { ...pagination, ...params };
        return resultService.getResultData(params)
            .then(res => {
                const dataSource = res.data.list.map(item => ({key: item.id, ...item}));
                this.setState({ dataSource, pagination });
                return Promise.resolve();
            })
            .catch(err => {
                console.log(err);
            })
    };
    getUserInfo = () => {
        const { getUserInfo } = this.props.userActions;
        getUserInfo();
    };
    onTableChange = (pagination, filters, sorter) => {
        this.getData(pagination)
    };

    render() {
        return (
            <div id="result">
                <Table
                    dataSource={this.state.dataSource}
                    pagination={this.state.pagination}
                    onChange={this.onTableChange}
                    columns={this.columns} />
            </div>
        );
    }
}

export default result;
