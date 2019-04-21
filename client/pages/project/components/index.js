import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import List from './list'

export default class UserPage extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    match: PropTypes.object,
    action: PropTypes.object
  }

  componentDidMount() {
    const { match, action } = this.props
    action.query({ nid: match.params.id })
  }

  render() {
    const { project, action } = this.props
    const list = project.get('list')
    return (
      <div className="m-content">
        <Button className="p-add-btn" type="primary" ghost>
          添加项目
        </Button>
        <List list={list} action={action} />
      </div>
    )
  }
}
