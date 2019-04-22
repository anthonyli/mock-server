import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, message as $message } from 'antd'

import './index.less'

const FormItem = Form.Item

class RegLogin extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    action: PropTypes.object
  }

  state = {
    loginPending: false
  }

  register = e => {
    const { register, setActiveKey } = this.props.action

    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.userPassword !== values.userPassword2) {
          $message.error('输入密码不一致！')
          return
        }
        this.setState({ loginPending: true })
        register(values)
          .then(rst => {
            this.props.form.resetFields()
            setActiveKey('1')
            this.setState({ loginPending: false })
          })
          .catch(res => {
            this.setState({ loginPending: false })
            $message.error(res.message)
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form className="login-reg">
        <FormItem className="login-item">
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入账号' }]
          })(
            <Input
              className="login-input"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入账号"
            />
          )}
        </FormItem>
        <FormItem className="login-item">
          {getFieldDecorator('userNickName', {
            rules: [{ required: true, message: '请输入昵称' }]
          })(
            <Input
              className="login-input"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入昵称"
            />
          )}
        </FormItem>
        <FormItem className="login-item">
          {getFieldDecorator('userPassword', {
            rules: [{ required: true, message: '请输入密码' }]
          })(
            <Input
              className="login-input"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />
          )}
        </FormItem>
        <FormItem className="login-item">
          {getFieldDecorator('userPassword2', {
            rules: [{ required: true, message: '请输入确认密码' }]
          })(
            <Input
              className="login-input"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入确认密码"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            size="large"
            type="primary"
            onClick={this.register}
            loading={this.state.loginPending}
            className="login-form-button"
          >
            注册
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(RegLogin)
