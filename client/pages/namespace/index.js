import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import List from 'pages/project/page/list'

class Namespace extends Component {
  render() {
    return (
      <Switch>
        <Route component={List} path="/namespace/:id" />
      </Switch>
    )
  }
}
export default Namespace
