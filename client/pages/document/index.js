import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import List from 'pages/project/page/list'
import Add from 'pages/document/page/add'

class Project extends Component {
  render() {
    return (
      <Switch>
        <Route exact component={Add} path="/document/:pid/add" />
        <Route exact component={Add} path="/document/edit/:id" />
        <Route exact component={Add} path="/document/copy/:copyid" />
        <Route component={List} path="/" />
      </Switch>
    )
  }
}
export default Project
