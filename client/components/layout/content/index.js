import './index.less'
import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'

import { Layout, Menu, Breadcrumb } from 'antd'

const { Content, Sider } = Layout

class ContentView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    children: PropTypes.object,
    activeMenu: PropTypes.any,
    spacelist: PropTypes.array
  }

  onClickMenu = item => {
    console.log(item)
  }

  render() {
    const { children, spacelist, activeMenu } = this.props
    const defaultSelectedKeys = localStorage.getItem('activeMenu') || activeMenu
    console.log(defaultSelectedKeys, '====')

    return (
      <Content className="content-wrapper">
        {spacelist.length !== 0 && (
          <Layout className="con-layout">
            <Sider width={220}>
              <Menu
                onClick={this.onClickMenu}
                mode="inline"
                defaultSelectedKeys={[`${defaultSelectedKeys}`]}
                style={{ height: '100%' }}
              >
                {spacelist.map(item => {
                  return (
                    <Menu.Item key={`${item.id}`}>
                      <Link to={`/namespace`}>{item.nameSpace}</Link>
                    </Menu.Item>
                  )
                })}
              </Menu>
            </Sider>
            <Content className="layout-con">
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              {children}
            </Content>
          </Layout>
        )}
      </Content>
    )
  }
}

export default ContentView
