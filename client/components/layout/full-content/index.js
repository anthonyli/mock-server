import './index.less'
import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import history from 'common/history'

import { Layout, Menu, Breadcrumb, Icon, Tooltip } from 'antd'

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
    action: PropTypes.object,
    activeMenu: PropTypes.string,
    spacelist: PropTypes.array
  }

  onClickMenu = item => {
    const { action } = this.props
    localStorage.setItem('activeMenu', item.key)
    this.setState({
      defaultSelectedKeys: item.key
    })
    action.setActiveMenu(item.key)
    history.push('/namespace')
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
    const { children, spacelist, action } = this.props

    const itemobj = spacelist.find(res => {
      return res.id === Number(this.state.defaultSelectedKeys)
    })

    return (
      <Content className="content-wrapper">
        {spacelist.length !== 0 && (
          <Layout className="con-layout">
            <Sider className="con-sider" width={220}>
              <div className="con-folder-add">
                <p>{itemobj && itemobj.nameSpace}</p>
                <p>
                  <Tooltip placement="top" title={'新建空间'}>
                    <Icon type="folder-add" onClick={action.showModal} />
                  </Tooltip>
                </p>
              </div>
              <Menu
                onClick={this.onClickMenu}
                mode="inline"
                selectedKeys={[this.state.defaultSelectedKeys]}
              >
                {spacelist.map(item => {
                  return (
                    <Menu.Item key={`${item.id}`}>
                      <Icon type={item.type ? 'user' : 'folder'} />
                      {item.nameSpace}
                    </Menu.Item>
                  )
                })}
              </Menu>
            </Sider>
            <Content className="layout-con">
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
              {children}
            </Content>
          </Layout>
        )}
      </Content>
    )
  }
}

export default ContentView
