import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, message as $message } from 'antd'
import { Redirect } from 'react-router-dom'
import './index.less'

const FormItem = Form.Item

class Login extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    action: PropTypes.object.isRequired,
    login: PropTypes.func
  }

  state = {
    loginPending: false
  }

  login = e => {
    const { login, isLogin, setUserName, setUserNickName } = this.props.action
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loginPending: true })
        login(values)
          .then(rst => {
            localStorage.setItem('userName', values.userName)
            localStorage.setItem('token', rst.token)
            localStorage.setItem('userNickName', rst.userNickName)
            setUserName(values.userName)
            setUserNickName(rst.userNickName)
            isLogin(true)
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
    const isLogin = this.props.user.get('isLogin')

    return (
      <div className="page-login">
        {isLogin ? <Redirect to="/" /> : ''}
        <div className="login-box">
          <div className="b-left">
            <p className="logo" />
            <p className="name">禾优曼管理系统</p>
          </div>
          <div className="b-right">
            <div className="login-title">
              <span>登录</span>
              /Login
            </div>
            <Form onSubmit={this.login} className="login-form">
              <FormItem>
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
              <FormItem>
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
          </div>
          <p className="point" />
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)
