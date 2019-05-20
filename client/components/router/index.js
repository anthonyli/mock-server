import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import lazyloader from './lazyloader'
import Auth from '../auth'
import pages from '../../pages'

// 改为 PureComponent 防止菜单收缩导致重新渲染
export default class CoreRouter extends React.PureComponent {
  get routes() {
    return pages.map(page => (
      <Auth
        key={page.page}
        page={page}
        component={lazyloader(() => import(`pages/${page.page}`))}
        path={`/${page.page}`}
      />
    ))
  }
  render() {
    return (
      <Switch>
        {this.routes}
        <Route component={lazyloader(() => import(`pages/login`))} path={`/login`} />
        <Redirect to="/namespace" />
      </Switch>
    )
  }
}
