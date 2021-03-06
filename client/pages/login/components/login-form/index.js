import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, message as $message } from 'antd'
import history from 'common/history'
import JSEncrypt from 'jsencrypt'
import publicKeyStr from 'common/key_pub'
import CryptoJS from 'crypto-js'

import './index.less'

const FormItem = Form.Item
const rsaEncrypt = new JSEncrypt()
rsaEncrypt.setPublicKey(publicKeyStr)

class Login extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    action: PropTypes.object,
    login: PropTypes.func
  }

  state = {
    loginPending: false
  }

  login = e => {
    const { login, setUser } = this.props.action
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loginPending: true })
        const pwd = CryptoJS.MD5(values.userPassword).toString()
        values.userPassword = rsaEncrypt.encrypt(pwd)
        login(values)
          .then(rst => {
            localStorage.setItem('_m_token', rst.token)
            setUser(rst.user)
            history.push('/namespace')
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
      <Form onSubmit={this.login} className="login-box">
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
        <FormItem>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={this.state.loginPending}
            className="login-form-button"
          >
            登录
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(Login)
