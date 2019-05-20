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

    // const itemobj = spacelist.find(res => {
    //   return res.id === Number(this.state.defaultSelectedKeys)
    // })

    return (
      <Content className="content-wrapper">
        <Layout className="con-layout">
          <Content className="layout-con">{children}</Content>
        </Layout>
      </Content>
    )
  }
}

export default ContentView
