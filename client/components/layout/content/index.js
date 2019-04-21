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
    location: PropTypes.object,
    spacelist: PropTypes.array
  }

  onClickMenu = item => {
    console.log(item)
  }

  render() {
    const { children, spacelist, location } = this.props
    const defaultSelectedKeys = location.pathname.split('/')

    return (
      <Content className="content-wrapper">
        {defaultSelectedKeys.length === 3 ? (
          <Layout className="con-layout">
            <Sider width={220}>
              <Menu
                onClick={this.onClickMenu}
                mode="inline"
                defaultSelectedKeys={[defaultSelectedKeys[2]]}
                style={{ height: '100%' }}
              >
                {spacelist.map(item => {
                  return (
                    <Menu.Item key={item.id}>
                      <Link to={`/namespace/${item.id}`}>{item.nameSpace}</Link>
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
        ) : (
          spacelist.length && <Redirect to={`/namespace/${spacelist[0].id}`} />
        )}
      </Content>
    )
  }
}

export default ContentView
