import React, {PureComponent} from 'react'

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;


import Footer from '../Footer'
import './style.scss'


class Login extends PureComponent {
    constructor(props) {
        super(props);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    getIcon = (type = 'user', style = { color: 'rgba(0,0,0,.25)' }) => {
        return <Icon type={type} style={style} />
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id='login'>
                <div className='content'>
                    <div className="form-wrapper">
                        <div className="icon">
                            <Icon type="gitlab" style={{
                                fontSize: '70px'
                            }} />
                        </div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {
                                    getFieldDecorator('userName', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your username!'
                                        }],
                                    })(
                                        <Input prefix={this.getIcon('user')} placeholder="Username" />
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your Password!'
                                    }],
                                })(
                                    <Input prefix={this.getIcon('lock')} type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>Remember me</Checkbox>
                                )}
                                <a className="login-form-forgot">Forgot password</a>
                                <br/>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                <br/>
                                Or <a>register now!</a>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Form.create()(Login);