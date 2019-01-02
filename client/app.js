// 页面初始化

import './boot'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import { init } from '@rematch/core'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import CoreRouter from 'components/router'
import withLayout from 'components/layout/with-layout'
import history from './common/history'
import { models } from './store'
// 登录页面不需要layout布局故放在这个路由展示
import Login from 'pages/user/page/login'

const RouteComponent = withLayout()(CoreRouter)

const store = init({
  models
})

ReactDOM.render(
  [
    <LocaleProvider key="provider" locale={zhCN}>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/user/login" component={Login} />
            <Route path="/" component={RouteComponent} />
          </Switch>
        </Router>
      </Provider>
    </LocaleProvider>
  ],
  document.getElementById('root')
)
