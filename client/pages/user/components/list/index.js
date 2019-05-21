import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Table, Popconfirm } from 'antd'
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
      dataIndex: 'role',
      render: role => {
        return role === 1 ? '管理员' : '用户'
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: status => {
        return status === 1 ? '开启' : '禁用'
      }
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
        const { action, list } = this.props
        const { params } = list
        return (
          <span className="actions">
            <Popconfirm
              placement="topRight"
              title="确定要操作该项？"
              onConfirm={() => {
                action.deleteUser(record.id).then(res => {
                  action.getUserList({ ...params })
                })
              }}
            >
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>
        )
      }
    }
  ]

  render() {
    const { list, action } = this.props

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
