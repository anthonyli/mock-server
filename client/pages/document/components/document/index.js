import React from 'react'
import PropTypes from 'prop-types'
import history from 'common/history'
import { Table, Button } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'

class ListViews extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    match: PropTypes.object,
    action: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  columns = [
    {
      title: '名称',
      dataIndex: 'title'
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <span className="actions">
            <a
              href="javascript:;"
              onClick={e => {
                e.stopPropagation()
                history.push(`/product/add/${record.id}`)
              }}
            >
              编辑
            </a>
            <a
              href="javascript:;"
              onClick={e => {
                e.stopPropagation()
                history.push(`/product/add/${record.id}`)
              }}
            >
              删除
            </a>
          </span>
        )
      }
    }
  ]

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

    const { loading, dataSource, params } = doclist.toJS()
    console.log(dataSource)
    return (
      <div className="page-doc">
        <Button
          className="p-add-btn"
          onClick={() => {
            history.push('/doc/add')
          }}
          type="primary"
          ghost
        >
          添加项目
        </Button>
        <Table
          rowKey="id"
          className="table-list"
          loading={loading}
          columns={this.columns}
          dataSource={dataSource.rows}
          pagination={{
            total: dataSource.count,
            pageSize: params.pageSize,
            current: params.pageIndex,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条`,
            onChange: pageIndex => action.querydoc({ ...params, pageIndex })
          }}
        />
      </div>
    )
  }
}

export default ListViews
