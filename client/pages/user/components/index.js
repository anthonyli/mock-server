import React from 'react'
import PropTypes from 'prop-types'

import Search from './search'
import List from './list'

export default class ListTable extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    action: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { action } = this.props
    action.getUserList()
  }

  render() {
    const { user, action } = this.props

    const { list } = user.toJS()

    return (
      <div className="m-content">
        {/* 查询条件 */}
        <Search action={action} list={list} />
        {/* 列表 */}
        <List list={list} action={action} />
      </div>
    )
  }
}
