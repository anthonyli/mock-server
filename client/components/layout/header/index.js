import './index.less'
import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
      const isAdmin = props.role === 'admin'
      if (item.adminFlag && !isAdmin) {
        return null
      }
      return (
        <Menu.Item key={key}>
          {item.name === '个人中心' ? (
            <Link to={item.path + `/${props.uid}`}>
              <Icon type={item.icon} />
              {item.name}
            </Link>
          ) : (
            <Link to={item.path}>
              <Icon type={item.icon} />
              {item.name}
            </Link>
          )}
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
  role: PropTypes.string,
  uid: PropTypes.number,
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
      {/* <Tooltip placement="bottom" title={'使用文档'}>
        <a
          className="toolbar-li"
          target="_blank"
          href="https://yapi.ymfe.org"
          rel="noopener noreferrer"
        >
          <Icon className="dropdown-link" style={{ fontSize: 16 }} type="question-circle" />
        </a>
      </Tooltip> */}
      <Dropdown
        className="toolbar-li"
        placement="bottomRight"
        trigger={['click']}
        overlay={
          <MenuUser
            user={props.user}
            msg={props.msg}
            uid={props.uid}
            role={'admin'}
            relieveLink={props.relieveLink}
            logout={props.logout}
          />
        }
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
  user: PropTypes.string,
  msg: PropTypes.string,
  uid: PropTypes.number,
  relieveLink: PropTypes.func,
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
    const { user, msg, uid, role, studyTip, imageUrl } = this.props
    return (
      <Header className="header-box">
        <div className="left">
          <Link onClick={this.relieveLink} to="/group" className="logo">
            <div className="href" />
          </Link>
          <span className="name">文档中心</span>
        </div>

        <div className="user-toolbar">
          <ToolUser
            {...{ studyTip, user, msg, uid, role, imageUrl }}
            relieveLink={this.relieveLink}
            logout={this.logout}
          />
        </div>
      </Header>
    )
  }
}
