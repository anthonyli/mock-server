import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

// 页面顶部文本
export default function Header({ userName, logoutUrl }) {
  return (
    <div className="userinfo">
      <span className="username">你好，{userName}</span>
      <a className="logout" href={logoutUrl}>
        <Icon type="logout" />
        退出登录
      </a>
    </div>
  )
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  logoutUrl: PropTypes.string.isRequired
}
