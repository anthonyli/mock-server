import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd'
import './index.less'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

class SearchForm extends Component {
  static propTypes = {
    form: PropTypes.object,
    onSubmit: PropTypes.func,
    loading: PropTypes.bool,
    formConfig: PropTypes.array
  }

  state = {
    expand: false
  }

  handleSearch = e => {
    const { onSubmit } = this.props
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      onSubmit(err, values)
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  toggle = () => {
    const { expand } = this.state
    this.setState({ expand: !expand })
  }
  renderOptions = options => {
    if (typeof options === 'number') {
      return Array.apply(null, Array(options)).map((item, idx) => {
        return (
          <Option key={idx} value={idx}>
            {idx}
          </Option>
        )
      })
    } else {
      return options.map((item, idx) => {
        if (typeof item === 'object') {
          return (
            <Option key={idx} value={item.value}>
              {item.label}
            </Option>
          )
        } else {
          return (
            <Option key={idx} value={item}>
              {item}
            </Option>
          )
        }
      })
    }
  }

  renderItem = item => {
    switch (item.type) {
      case 'select':
        return (
          <Select placeholder={item.placeholder} {...item.props}>
            {this.renderOptions(item.options)}
          </Select>
        )
      case 'date':
        return <RangePicker format="YYYY-MM-DD" {...item.props} />
      case 'input':
      default:
        return <Input placeholder={item.placeholder} {...item.props} />
    }
  }

  getFields() {
    const { formConfig } = this.props
    const { getFieldDecorator } = this.props.form
    const children = []
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const count = this.state.expand ? 10 : 3
    for (let i = 0; i < formConfig.length; i++) {
      const formItem = formConfig[i]
      children.push(
        <Col span={8} key={`form-${i}`}>
          <FormItem
            label={formItem.title}
            style={{ display: i < count ? 'block' : 'none' }}
            {...formItemLayout}
          >
            {getFieldDecorator(formItem.dataIndex, formItem.formOptions || {})(
              this.renderItem(formItem)
            )}
          </FormItem>
        </Col>
      )
    }
    return children
  }

  render() {
    const { loading } = this.props
    return (
      <Form className="m-search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button loading={loading} icon="search" type="primary" htmlType="submit">
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清除
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              收缩 <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(SearchForm)
