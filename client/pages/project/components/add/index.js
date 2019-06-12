import './index.less'
import React from 'react'
import PropTypes from 'prop-types'
import { Form, message, Select, Input, Button } from 'antd'
import history from 'common/history'

const { TextArea } = Input

const Option = Select.Option

class DetailForm extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    allUsers: PropTypes.array,
    action: PropTypes.object,
    currentRecord: PropTypes.object
  }

  componentDidMount() {}

  onSubmit = e => {
    const { action, callback, form } = this.props

    form.validateFields((errors, data) => {
      if (!errors) {
        action.saveProject(data).then(() => {
          history.push('/namespace')
          message.success(`添加成功！`)
          callback && callback()
        })
      }
    })
  }

  renderOptions = options => {
    return options.map((item, idx) => {
      return (
        <Option key={item.id} value={item.id}>
          {item.userNickName}
        </Option>
      )
    })
  }

  render() {
    const { form, common, project } = this.props

    const { getFieldDecorator } = form

    const { allUsers } = common.toJS()
    const { editData } = project.toJS()

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Item {...formItemLayout} label="项目名称">
          {getFieldDecorator('projectName', {
            initialValue: editData.projectName,
            rules: [{ required: true, message: '请填写项目名称' }]
          })(<Input placeholder="请输入项目名称" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="描述">
          {getFieldDecorator('description', {
            initialValue: editData.description
          })(<TextArea rows={3} placeholder="请输入描述" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="负责人">
          {getFieldDecorator('owner', {
            initialValue: editData.owner,
            rules: [{ required: true, message: '请选择' }]
          })(
            <Select
              showSearch
              mode="multiple"
              filterOption={(input, option) => {
                return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }}
              allowClear
              className="search-select"
              placeholder="请选择"
            >
              {this.renderOptions(allUsers)}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="成员">
          {getFieldDecorator('members', {
            initialValue: editData.members
          })(
            <Select
              showSearch
              mode="multiple"
              filterOption={(input, option) => {
                return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }}
              allowClear
              className="search-select"
              placeholder="请选择"
            >
              {this.renderOptions(allUsers)}
            </Select>
          )}
        </Form.Item>
        <Button type="primary" style={{ marginLeft: '20px' }} htmlType="submit">
          确定
        </Button>
      </Form>
    )
  }
}

export default Form.create()(DetailForm)
