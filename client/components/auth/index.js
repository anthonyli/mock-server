import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Layouts from '../layout'

const { Fragment } = React

class Auth extends React.Component {
  static propTypes = {
    component: PropTypes.func.isRequired
  }

  render() {
    const { component: Component, page, ...rest } = this.props
    const isLogin = localStorage.getItem('_m_token')
    return (
      <Fragment>
        {isLogin ? (
          <Layouts isfull={page.isfull}>
            <Route
              {...rest}
              render={props => {
                return <Component {...props} />
              }}
            />
          </Layouts>
        ) : (
          <Redirect to="/login" />
        )}
      </Fragment>
    )
  }
}

export default Auth
