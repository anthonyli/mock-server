import './index.less'
import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Layout, Menu, Breadcrumb } from 'antd'

const { Content, Sider } = Layout

class ContentView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultSelectedKeys: localStorage.getItem('activeMenu') || ''
    }
  }

  static propTypes = {
    children: PropTypes.object,
    activeMenu: PropTypes.string,
    spacelist: PropTypes.array
  }

  onClickMenu = item => {
    localStorage.setItem('activeMenu', item.key)
  }

  componentWillReceiveProps(props) {
    const editData = props.activeMenu
    const oldeditData = this.props.activeMenu
    if (editData !== oldeditData) {
      this.setState({
        defaultSelectedKeys: localStorage.getItem('activeMenu')
      })
    }
  }

  render() {
    const { children, spacelist } = this.props

    return (
      <Content className="content-wrapper">
        {spacelist.length !== 0 && (
          <Layout className="con-layout">
            <Sider width={220}>
              <Menu
                onClick={this.onClickMenu}
                mode="inline"
                selectedKeys={[this.state.defaultSelectedKeys]}
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
