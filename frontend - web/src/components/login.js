import React from 'react'
import { Form, Icon, Input, Button, notification } from 'antd'
import { url } from '../secret'


class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const headers = {
          'Content-Type': 'application/json;charset=utf-8',
          Username: values.Username,
          Password: values.Password
        }
        fetch(url+'login', {
          headers: headers,
        }).then(response => response.json())
        .then(result => {
          if(result.status === 'good') {
            this.props.loggedIn(values)
          } else {
            notification.error({
              message: 'Login Error',
              description: 'Please try re-entering your username and password.'
            })
          }}
        )
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('Username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('Password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign In
          </Button>
          <br></br>Or <a onClick={()=>this.props.next()}>Sign Up!</a>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)
export default WrappedNormalLoginForm