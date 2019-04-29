import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import List from 'pages/project/page/list'
import Add from 'pages/project/page/add'
import Document from 'pages/document/page/list'

class Project extends Component {
  render() {
    return (
      <Switch>
        <Route exact component={Add} path="/project/add" />
        <Route exact component={Document} path="/project/:id" />
        <Route component={List} path="/" />
      </Switch>
    )
  }
}
export default Project
