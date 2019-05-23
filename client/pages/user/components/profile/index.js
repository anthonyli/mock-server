import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, message as $message } from 'antd'
import history from 'common/history'

import './index.less'

const FormItem = Form.Item

class Profile extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    action: PropTypes.object,
    login: PropTypes.func
  }

  state = {
    loginPending: false
  }

  componentDidMount() {
    const { action } = this.props
    action.getFindUser()
  }

  login = e => {
    const { login } = this.props.action
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loginPending: true })
        login(values)
          .then(rst => {
            localStorage.setItem('_m_token', rst.token)
            history.push('namespace')
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

    const formItemLayout50 = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
    }

    return (
      <Form onSubmit={this.login} className="login-box">
        <FormItem className="add-formitem" label="用户id" {...formItemLayout50}>
          {getFieldDecorator('canPhone', {
            rules: [{ required: true, message: '请填写手机' }]
          })(<Input />)}
        </FormItem>
        <FormItem className="add-formitem" label="用户名" {...formItemLayout50}>
          {getFieldDecorator('canPhone', {
            rules: [{ required: true, message: '请填写手机' }]
          })(<Input />)}
        </FormItem>

        <FormItem className="add-formitem" label="昵称" {...formItemLayout50}>
          {getFieldDecorator('canPhone', {
            rules: [{ required: true, message: '请填写手机' }]
          })(<Input />)}
        </FormItem>
        <FormItem className="add-formitem" label="Email" {...formItemLayout50}>
          {getFieldDecorator('canPhone', {
            rules: [{ required: true, message: '请填写手机' }]
          })(<Input />)}
        </FormItem>

        <FormItem className="add-formitem" label="角色" {...formItemLayout50}>
          {getFieldDecorator('canPhone', {
            rules: [{ required: true, message: '请填写手机' }]
          })(<Input />)}
        </FormItem>
        <FormItem className="add-formitem" label="创建账号时间" {...formItemLayout50}>
          {getFieldDecorator('canPhone', {
            rules: [{ required: true, message: '请填写手机' }]
          })(<Input />)}
        </FormItem>
        <FormItem className="add-formitem" label="更新账号时间" {...formItemLayout50}>
          {getFieldDecorator('canPhone', {
            rules: [{ required: true, message: '请填写手机' }]
          })(<Input />)}
        </FormItem>
        <FormItem className="add-formitem" label="密码" {...formItemLayout50}>
          {getFieldDecorator('canPhone', {
            rules: [{ required: true, message: '请填写手机' }]
          })(<Input />)}
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

export default Form.create()(Profile)
