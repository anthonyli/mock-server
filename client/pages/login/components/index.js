import './index.less'
import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import Footer from 'components/layout/footer'
import LoginForm from './login-form'
import RegForm from './reg-form'

const TabPane = Tabs.TabPane

class Login extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    action: PropTypes.object
  }

  state = {
    loginPending: false
  }

  setActiveKey = item => {
    const { action } = this.props
    action.setActiveKey(item)
  }

  render() {
    const { action } = this.props
    const defaultActiveKey = this.props.user.get('defaultActiveKey')

    return (
      <div className="page-login">
        <div className="login-container">
          <div className="login-form">
            <div className="logo" />
            <Tabs
              defaultActiveKey={defaultActiveKey}
              activeKey={defaultActiveKey}
              onChange={this.setActiveKey}
            >
              <TabPane tab="登录" key="1">
                <LoginForm action={action} />
              </TabPane>
              <TabPane tab={'注册'} key="2">
                <RegForm action={action} />
              </TabPane>
            </Tabs>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Login
