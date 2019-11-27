import React from 'react'
import { Form, Icon, Input, Button, notification } from 'antd'
import { url } from '../secret'


class NormalRegisterForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch(url+'user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(values)
        }).then(response => response.json(values))
        .then(result => {
          console.log(result)
          if(result.err === 'none') {
            this.props.loggedIn(values)
          } else if(result.err === 'none'){
            notification.error({
              message: 'Registration Error',
              description: 'A user with that username already exists.'
            })
          }else {
            notification.error({
              message: 'Registration Error',
              description: 'Please try entering the information again.'
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
          {getFieldDecorator('FName', {
            rules: [{ required: true, message: 'Please input your first name!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="First Name"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('LName', {
            rules: [{ required: true, message: 'Please input your last name!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Last Name"
            />,
          )}
        </Form.Item>
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
            Sign Up
          </Button>
          <br></br>Or <a onClick={()=>this.props.next()}>Sign In!</a>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedNormalRegisterForm = Form.create({ name: 'normal_login' })(NormalRegisterForm)
export default WrappedNormalRegisterForm