import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './login.module.less'

export default class Login extends Component {
  onFinish(value) {
    console.log('success:', value)
  }
  render() {
    return (
      <div className="container">
        <div className="box">
          <Form name="login" initialValues={{remember: true}}
            className="login-form"
            onFinish={this.onFinish}>
            <Form.Item name="username" rules={[
              {required: true, message: "请输入账号"}
            ]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
            </Form.Item>
            <Form.Item name="password" rules={[
              {required: true, message: "请输入密码"}
            ]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码" />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
