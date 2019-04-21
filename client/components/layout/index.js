import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'
import { connect } from 'react-redux'

import { Layout } from 'antd'

import Footer from './footer'
import Header from './header'
import Content from './content'

class LayoutApp extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static propTypes = {
    children: PropTypes.object,
    common: PropTypes.object,
    location: PropTypes.object,
    action: PropTypes.object
  }

  componentDidMount() {
    const { action } = this.props
    action.querySpace()
  }

  render() {
    const { children, common, location } = this.props
    const { spacelist } = common.toJS()
    return (
      <div className="m-container">
        <Layout>
          <Header />
          <Content location={location} spacelist={spacelist}>
            {children}
          </Content>
          <Footer />
        </Layout>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const common = state.common
  return {
    common
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.common
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutApp)
