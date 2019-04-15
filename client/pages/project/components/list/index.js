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
  // id: project.dataValues.id,
  //           projectName: project.dataValues.,
  //           description: project.dataValues.description,
  //           owner: owner,
  //           members: members,
  //           isOwner
  columns = [
    {
      title: '编号',
      dataIndex: 'id'
    },
    {
      title: '名称',
      dataIndex: 'projectName'
    },
    {
      title: '描述',
      dataIndex: 'description'
    },
    {
      title: '负责人',
      render: item => {
        return <span>{item.owner.userNickName}</span>
      }
    },
    {
      title: '成员',
      render: item => {
        return item.members.map(u => {
          return (
            <span className="c-p-member" key={u.userId}>
              {u.userNickName}
            </span>
          )
        })
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
        dataSource={dataSource}
        pagination={{
          total: dataSource.length,
          pageSize: params.pageSize,
          current: params.pageIndex,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条`,
          onChange: page => action.query({ ...params, page })
        }}
      />
    )
  }
}

export default ListViews
