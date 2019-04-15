import React from 'react'
import PropTypes from 'prop-types'
import Layout from './layout'
import withMenu from './with-menu'

import {
  userInfo,
  menus,
  appCode,
  pageTitle,
  baseURI,
  responsive,
  defaultLayout
} from 'common/config'

const { nicknameCn = '' } = userInfo

const withLayout = (layout = defaultLayout) => WrappedComponent => {
  const CustomerLayout = withMenu(Layout)

  return class extends React.Component {
    static displayName = `${layout}Layout`
    static propTypes = {
      location: PropTypes.object.isRequired
    }
    render() {
      // 注意：此处使用的 location 是有 react-router Route 组件注入的 props
      const { location } = this.props
      return layout !== 'blank' ? (
        <CustomerLayout
          menus={menus}
          logoutUrl={`${baseURI}/logout`}
          userName={nicknameCn}
          title={pageTitle}
          appCode={appCode}
          logo={require('../../assets/images/icon.png')}
          responsive={responsive}
          className={this.className}
          layout={layout}
          location={location}
        >
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