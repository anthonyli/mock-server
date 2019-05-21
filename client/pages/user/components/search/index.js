import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import './index.less'

const InputSearch = Input.Search

export default class Search extends Component {
  static propTypes = {
    action: PropTypes.object,
    list: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {}

  onSubmit = values => {
    const { action, list } = this.props
    const { params } = list
    params.userName = values
    action.getUserList({ ...params })
  }

  render() {
    return (
      <div className="m-user-search">
        <InputSearch
          className="user-search"
          placeholder="请输入用户名"
          onSearch={this.onSubmit}
          enterButton
        />
      </div>
    )
  }
}
