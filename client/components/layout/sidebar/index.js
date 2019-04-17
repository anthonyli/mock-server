import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './index.less'

import { Menu, Icon, Badge, Button } from 'antd'
const SubMenu = Menu.SubMenu

class SideBar extends Component {
  static get propTypes() {
    return {
      activeProductId: PropTypes.string,
      activeSubMenu: PropTypes.string,
      sidebar: PropTypes.object,
      handleClick: PropTypes.func
    }
  }
  render() {
    let { activeProductId, handleClick, activeSubMenu, sidebar } = this.props
    return (
      <div className="m-side">
        <Menu
          mode="inline"
          onClick={handleClick}
          selectedKeys={[activeSubMenu]}
          defaultOpenKeys={['sub1']}
          style={{ width: 179 }}
        >
          <Menu.Item key="app">
            <Link to={`/app/${activeProductId}`}>
              <Icon type="home" />
              首页
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="layout" />
                <span>项目详情</span>
              </span>
            }
          >
            <Menu.Item key="sprint">
              <Link to={`/sprint/${activeProductId}`}>当前迭代</Link>
            </Menu.Item>
            <Menu.Item key="done-sprint">
              <Link to={`/done-sprint/${activeProductId}`}>历史迭代</Link>
            </Menu.Item>
            <Menu.Item key="requirement">
              <Link to={`/requirement/${activeProductId}`}>需求池</Link>
            </Menu.Item>
            <Menu.Item key="bug">
              <Link to={`/bug/${activeProductId}`}>
                遗留Bug池
                {sidebar.fixInFutureBugNumber && (
                  <Badge
                    count={sidebar.fixInFutureBugNumber}
                    overflowCount={999}
                    style={{ backgroundColor: '#f56a00' }}
                  />
                )}
              </Link>
            </Menu.Item>
            <Menu.Item key="online-bug">
              <Link to={`/online-bug/${activeProductId}`}>
                线上Bug池
                {sidebar.onlineBugNumber && (
                  <Badge
                    count={sidebar.onlineBugNumber}
                    overflowCount={999}
                    style={{ backgroundColor: '#f56a00' }}
                  />
                )}
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
        <div style={{ marginTop: '30px', width: '180px', textAlign: 'center' }}>
          <Button style={{ width: '140px' }} type="primary" size="large">
            <Link to={`/project-manager/${activeProductId}`}>项目管理</Link>
          </Button>
        </div>
      </div>
    )
  }
}

export default SideBar
