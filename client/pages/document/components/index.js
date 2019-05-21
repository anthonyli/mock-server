import React from 'react'
import PropTypes from 'prop-types'
import history from 'common/history'
import { Button } from 'antd'

import List from './list'

class PageIndex extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    match: PropTypes.object,
    action: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { match } = this.props
    const { id } = match.params || {}
    const { querydoc } = this.props.action
    if (id) {
      querydoc({ pid: match.params.id })
    }
  }

  render() {
    const { project, action } = this.props
    const doclist = project.get('doclist')

    const { dataSource } = doclist.toJS()

    const { match } = this.props
    const { id } = match.params || {}

    return (
      <div className="page-doc">
        <Button
          className="p-add-btn"
          onClick={() => {
            history.push(`/document/${id}/add`)
          }}
          type="primary"
          ghost
        >
          添加接口
        </Button>
        {dataSource.count ? <List doclist={doclist} action={action} /> : null}
      </div>
    )
  }
}

export default PageIndex
