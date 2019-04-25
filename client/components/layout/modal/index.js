import './index.less'
import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, message, Select, Input } from 'antd'

const { TextArea } = Input

const Option = Select.Option

@Form.create()
class DetailForm extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    allUsers: PropTypes.array,
    action: PropTypes.object,
    currentRecord: PropTypes.object
  }

  componentDidMount() {}

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
    const { form, currentRecord, allUsers } = this.props

    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    return (
      <Form>
        <Form.Item {...formItemLayout} label="空间名称">
          {getFieldDecorator('nameSpace', {
            initialValue: currentRecord.nameSpace,
            rules: [{ required: true, message: '请填写空间名称' }]
          })(<Input placeholder="请输入空间名称" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="描述">
          {getFieldDecorator('description', {
            initialValue: currentRecord.description
          })(<TextArea rows={3} placeholder="请输入描述" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="负责人">
          {getFieldDecorator('owner', {
            initialValue: currentRecord.owner,
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
            initialValue: currentRecord.members
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
      </Form>
    )
  }
}

export default class Detail extends React.Component {
  static propTypes = {
    modal: PropTypes.object,
    callback: PropTypes.func,
    allUsers: PropTypes.array,
    action: PropTypes.object
  }

  onSubmit = e => {
    const { action, callback } = this.props

    this.refs.form.validateFields((errors, data) => {
      if (!errors) {
        action.saveSpace(data).then(() => {
          action.hideModal()
          message.success(`添加成功！`)
          callback && callback()
        })
      }
    })
  }

  render() {
    const { modal, action, allUsers } = this.props
    const { currentRecord, loading, visible } = modal

    return (
      <Modal
        className="modal-form"
        title="添加空间"
        visible={visible}
        confirmLoading={loading}
        onOk={this.onSubmit}
        maskClosable={false}
        onCancel={action.hideModal}
      >
        <DetailForm ref="form" action={action} allUsers={allUsers} currentRecord={currentRecord} />
      </Modal>
    )
  }
}
