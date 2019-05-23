import './index.less'
import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import history from 'common/history'
import { Icon, Layout, Menu, Dropdown, Tooltip } from 'antd'

const { Header } = Layout

let HeaderMenu = {
  user: {
    path: '/user/profile',
    name: '个人中心',
    icon: 'user',
    adminFlag: false
  },
  solution: {
    path: '/user/list',
    name: '用户管理',
    icon: 'solution',
    adminFlag: true
  }
}

const MenuUser = props => (
  <Menu theme="dark" className="user-menu">
    {Object.keys(HeaderMenu).map(key => {
      let item = HeaderMenu[key]
      const isAdmin = props.user.role === 1
      if (item.adminFlag && !isAdmin) {
        return null
      }
      return (
        <Menu.Item key={key}>
          <Link to={item.path}>
            <Icon type={item.icon} />
            {item.name}
          </Link>
        </Menu.Item>
      )
    })}
    <Menu.Item key="9">
      <a onClick={props.logout}>
        <Icon type="logout" />
        退出
      </a>
    </Menu.Item>
  </Menu>
)

MenuUser.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func
}

const ToolUser = props => {
  // let imageUrl = props.imageUrl ? props.imageUrl : `/api/user/avatar?uid=${props.uid}`
  return (
    <div className="user-toolbar">
      <Tooltip placement="bottom" title={'我的关注'}>
        <Link className="toolbar-li" to="/follow">
          <Icon className="dropdown-link" theme="filled" style={{ fontSize: 16 }} type="star" />
        </Link>
      </Tooltip>
      <Tooltip placement="bottom" title={'新建项目'}>
        <Link className="toolbar-li" to="/add-project">
          <Icon
            className="dropdown-link"
            theme="filled"
            style={{ fontSize: 16 }}
            type="plus-circle"
          />
        </Link>
      </Tooltip>
      <Dropdown
        className="toolbar-li"
        placement="bottomRight"
        trigger={['click']}
        overlay={<MenuUser user={props.user} logout={props.logout} />}
      >
        <a className="dropdown-link">
          <span className="avatar-image">
            <Icon style={{ fontSize: 16 }} type="user" />
          </span>
          <span className="name">
            <Icon type="down" />
          </span>
        </a>
      </Dropdown>
    </div>
  )
}
ToolUser.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func
}

export default class HeaderCom extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static propTypes = {
    router: PropTypes.object
  }

  render() {
    const { imageUrl, action, user } = this.props
    return (
      <Header className="header-box">
        <div className="left">
          <Link to="/namespace" className="logo">
            <div className="href" />
          </Link>
          <span className="name">文档中心</span>
        </div>

        <div className="user-toolbar">
          <ToolUser
            {...{ user, imageUrl }}
            logout={() => {
              action.logout()
              history.push('/login')
            }}
          />
        </div>
      </Header>
    )
  }
}
