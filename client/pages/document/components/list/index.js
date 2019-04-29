import React from 'react'
import PropTypes from 'prop-types'
import history from 'common/history'
import { Table } from 'antd'
import './index.less'

class ListViews extends React.Component {
  static propTypes = {
    doclist: PropTypes.object,
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

  render() {
    const { doclist, action } = this.props

    const { loading, dataSource, params } = doclist.toJS()
    return (
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
    )
  }
}

export default ListViews
