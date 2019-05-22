import React from 'react'
import PropTypes from 'prop-types'
import { Button, Tabs } from 'antd'
import List from './list'
import history from 'common/history'

const TabPane = Tabs.TabPane

export default class PageIndex extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    common: PropTypes.object,
    action: PropTypes.object
  }

  componentDidMount() {
    const { action } = this.props
    action.query()
  }

  render() {
    const { project, action, common } = this.props
    const list = project.get('list')
    const { dataSource } = list.toJS()
    const { spacelist, activeMenu } = common.toJS()
    const itemobj = spacelist.find(res => {
      return res.id === Number(activeMenu)
    })
    return (
      <div className="m-content">
        <Tabs type="card">
          <TabPane tab="项目列表" key="1">
            <Button
              className="p-add-btn"
              onClick={() => {
                history.push('/project/add')
              }}
              type="primary"
              ghost
            >
              添加项目
            </Button>
            {dataSource.length ? <List list={list} action={action} /> : null}
          </TabPane>
          {itemobj && !itemobj.type && (
            <TabPane tab="成员列表" key="2">
              Content of Tab Pane 2
            </TabPane>
          )}

          <TabPane tab="空间设置" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
