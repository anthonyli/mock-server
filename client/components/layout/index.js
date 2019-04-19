import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'

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
    children: PropTypes.object
  }

  componentDidMount() {}

  render() {
    const { children } = this.props
    return (
      <div className="m-container">
        <Layout>
          <Header />
          <Content>{children}</Content>
          <Footer />
        </Layout>
      </div>
    )
  }
}

export default LayoutApp
