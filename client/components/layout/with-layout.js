import React from 'react'
import PropTypes from 'prop-types'
import Layout from './index'

import {
  userInfo,
  menus,
  appCode,
  pageTitle,
  baseURI,
  responsive,
  defaultLayout
} from 'common/config'

const withLayout = (layout = defaultLayout) => WrappedComponent => {
  const CustomerLayout = Layout

  return class extends React.Component {
    static displayName = `${layout}Layout`
    static propTypes = {
      location: PropTypes.object.isRequired
    }
    render() {
      const { location } = this.props
      return layout !== 'blank' ? (
        <CustomerLayout location={location}>
          <WrappedComponent {...this.props} />
        </CustomerLayout>
      ) : (
        <WrappedComponent {...this.props} />
      )
    }

    get className() {
      let className = `top-layout top-layout-${layout}`
      if (responsive) {
        className += ' top-layout-responsive'
      }

      return className
    }
  }
}

export default withLayout
