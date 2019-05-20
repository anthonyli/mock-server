import React from 'react'
import PropTypes from 'prop-types'
import history from 'common/history'
import moment from 'moment'
import { Table } from 'antd'
import './index.less'

class ListViews extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    action: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  columns = [
    {
      title: '用户名',
      dataIndex: 'userName'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '电话',
      dataIndex: 'userTel'
    },
    {
      title: '角色',
      dataIndex: 'role'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: updateTime => {
        return moment(updateTime).format('YYYY-MM-DD hh:mm:ss')
      }
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
                history.push(`/document/add/${record.id}`)
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
    const { action } = this.props
    action.getUserList()
  }

  render() {
    const { user, action } = this.props

    const { list } = user.toJS()

    const { loading, dataSource, params } = list

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
