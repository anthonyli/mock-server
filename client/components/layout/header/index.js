import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Select, Icon, Input, Dropdown, Menu } from 'antd'
import './index.less'

const { Option, OptGroup } = Select
const Search = Input.Search

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/myLogout" role="menuitem" tabIndex="-1">
        <Icon type="logout" /> 退出
      </a>
    </Menu.Item>
  </Menu>
)

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static propTypes = {
    nicknameCN: PropTypes.string,
    list: PropTypes.array,
    productid: PropTypes.string,
    handleSelectProduct: PropTypes.func,
    handleDoSearch: PropTypes.func
  }

  render() {
    const { nicknameCN, list, productid, handleSelectProduct, handleDoSearch } = this.props
    return (
      <div className="m-header">
        <div className="m-nav">
          <Link to="/" className="logo">
            <img
              src={require('common/styles/images/logo-1.png')}
              alt="homepage"
              className="dark-logo"
            />
          </Link>
          <Select
            className="m-select"
            placeholder="项目"
            size="large"
            value={`${productid}`}
            onChange={handleSelectProduct}
            dropdownMatchSelectWidth={false}
          >
            <OptGroup label="没有你的项目？">
              <Option value="new">
                <Icon type="plus-circle" /> 新建项目
              </Option>
            </OptGroup>
            <OptGroup label="我的项目">
              {list.map((item, index) => {
                return (
                  <Option key={index} value={`${item.id}`}>
                    {item.name}
                  </Option>
                )
              })}
            </OptGroup>
          </Select>
          <div className="user">
            <Search
              placeholder="按标题搜索"
              style={{ width: 150 }}
              onSearch={value => handleDoSearch(value, productid)}
            />
            <div className="login-menu">
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="user" /> {nicknameCN}
                  <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
