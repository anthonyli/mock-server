// 页面初始化

import './boot'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import { init } from '@rematch/core'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import CoreRouter from 'components/router'
import history from './common/history'
import { models } from './store'

const store = init({
  models
})

ReactDOM.render(
  [
    <LocaleProvider key="provider" locale={zhCN}>
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={CoreRouter} />
        </Router>
      </Provider>
    </LocaleProvider>
  ],
  document.getElementById('root')
)
