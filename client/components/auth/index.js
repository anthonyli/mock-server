import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Auth extends React.Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  render() {
    const { component: Component, user, ...rest } = this.props
    const isLogin = user.get('isLogin')
    return (
      <Route
        {...rest}
        render={props => {
          return isLogin ? <Component {...props} /> : <Redirect to="/user/login" />
        }}
      />
    )
  }
}

function mapStateToProps(state) {
  const user = state.user
  return {
    user
  }
}

export default connect(mapStateToProps)(Auth)
