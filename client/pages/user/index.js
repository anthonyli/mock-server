import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import List from 'pages/user/page'
import Profile from 'pages/user/page/profile'

class User extends Component {
  render() {
    return (
      <Switch>
        <Route component={Profile} path="/user/profile" />
        <Route component={List} path="/user/list" />
      </Switch>
    )
  }
}
export default User
