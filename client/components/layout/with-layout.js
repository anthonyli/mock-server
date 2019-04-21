import React from 'react'
import PropTypes from 'prop-types'
import Layout from './index'

const withLayout = (layout = 'basic') => WrappedComponent => {
  const CustomerLayout = Layout

  return class extends React.Component {
    static displayName = `${layout}Layout`
    static propTypes = {
      location: PropTypes.object.isRequired
    }
    render() {
      const { location, match } = this.props
      return layout !== 'blank' ? (
        <CustomerLayout match={match} location={location}>
          <WrappedComponent {...this.props} />
        </CustomerLayout>
      ) : (
        <WrappedComponent {...this.props} />
      )
    }

    get className() {
      const className = `layout layout-${layout}`

      return className
    }
  }
}

export default withLayout
