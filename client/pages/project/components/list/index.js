import React from 'react'
import PropTypes from 'prop-types'
import history from 'common/history'
import { Table } from 'antd'
import './index.less'

class ListViews extends React.Component {
  static propTypes = {
    list: PropTypes.object,
    action: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  columns = [
    {
      title: '编号',
      dataIndex: 'company_name'
    },
    {
      title: '名称',
      dataIndex: 'product_inner_name'
    },
    {
      title: '负责人',
      dataIndex: 'product_name'
    },
    {
      title: '成员',
      dataIndex: 'product_level'
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <span className="action">
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

  componentDidMount() {}

  render() {
    const { list, action } = this.props

    const { loading, dataSource, params } = list.toJS()

    return (
      <Table
        rowKey="id"
        className="table-list"
        loading={loading}
        columns={this.columns}
        dataSource={dataSource.list}
        pagination={{
          total: dataSource.total,
          pageSize: params.size,
          current: params.page,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条`,
          onChange: page => action.query({ ...params, page })
        }}
      />
    )
  }
}

export default ListViews
