import React, { Component } from 'react'
import { Form, Tabs, Input, Radio, Button, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import './index.less'
import history from 'common/history'
import AceEditor from 'react-ace'
import EditTable from '../edit-table'

import 'brace/mode/javascript'
import 'brace/theme/github'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const TabPane = Tabs.TabPane
const { TextArea } = Input

class EditDoc extends Component {
  static propTypes = {
    form: PropTypes.object,
    document: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {}
  }

  saveDoc = () => {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return false
      }
      const { document, action, match } = this.props
      const { editData } = document.toJS()
      const docContent = JSON.parse(editData.content || '{}')
      const { id } = match.params || {}

      const docData = {
        id: editData.id,
        title: values.title,
        pid: editData.pid || id,
        content: JSON.stringify(Object.assign({}, docContent, values, this.state))
      }
      action.saveDocument(docData).then(res => {
        history.goBack()
      })
    })
  }

  handleResBody = value => {
    this.setState({
      resBody: value
    })
  }

  checkPath(rule, value, callback) {
    const reg = new RegExp(/^\/[a-zA-Z0-9_-]+?/)
    if (!value || reg.test(value)) {
      callback()
    } else {
      callback(new Error('路径格式错误'))
    }
  }

  handleReqHeader = reqHeader => {
    this.setState({
      reqHeader: reqHeader
    })
  }

  handleReqBody = value => {
    const { document } = this.props
    const { editData } = document.toJS()
    const docContent = JSON.parse(editData.content || '{}')
    const reqType = this.props.form.getFieldValue('requestType')
    const reqBody = this.state.reqBody || docContent.reqBody || {}
    reqBody[reqType] = value
    this.setState({
      reqBody: reqBody
    })
  }

  getReqParams = reqBody => {
    const reqType = this.props.form.getFieldValue('requestType')
    let reqInput
    switch (reqType) {
      case 'JSON':
        reqInput = (
          <AceEditor
            mode="javascript"
            theme="github"
            value={reqBody[reqType]}
            onChange={this.handleReqBody}
            name="request json"
            width="100%"
            minLines={10}
            maxLines={50}
            className="ace-editor"
            showPrintMargin={false}
            showGutter
            editorProps={{ $blockScrolling: true }}
          />
        )
        break
      case 'FORM-DATA':
        reqInput = (
          <EditTable
            showDataType
            paramList={reqBody[reqType]}
            onChange={this.handleReqBody}
            showRequired
          />
        )
        break
      case 'X-WWW-FORM-URLENCODED':
        reqInput = (
          <EditTable paramList={reqBody[reqType]} onChange={this.handleReqBody} showRequired />
        )
        break
      default:
        reqInput = (
          <AceEditor
            mode="javascript"
            theme="github"
            value={reqBody[reqType]}
            onChange={this.handleReqBody}
            name="request json"
            width="100%"
            minLines={10}
            maxLines={50}
            className="ace-editor"
            showPrintMargin={false}
            showGutter
            editorProps={{ $blockScrolling: true }}
          />
        )
    }
    return reqInput
  }

  componentDidMount() {
    const { match } = this.props
    const { id } = match.params || {}
    const { queryById } = this.props.action
    if (id) {
      queryById(match.params.id)
    }
  }

  render() {
    const { document, form } = this.props
    const { editData } = document.toJS()
    const { getFieldDecorator } = form

    const docContent = JSON.parse(editData.content || '{}')

    const reqBody = this.state.reqBody || docContent.reqBody || {}
    const reqHeader = this.state.reqHeader || docContent.reqHeader

    const resBody = !this.state.resBody ? docContent.resBody : this.state.resBody

    const itemStyle = {
      labelCol: {
        span: 2
      },
      wrapperCol: {
        span: 16
      }
    }
    return (
      <div className="edit-doc">
        <Form className="mt-20">
          <FormItem label="接口名" {...itemStyle}>
            {getFieldDecorator('title', {
              initialValue: editData.title,
              rules: [{ required: true, message: '请输入接口名称' }]
            })(<Input placeholder="接口名称" />)}
          </FormItem>

          <FormItem label="路径" {...itemStyle}>
            {getFieldDecorator('pathName', {
              initialValue: docContent.pathName,
              rules: [
                { required: true, message: '请输入路径,例: /api/v3/test' },
                { validator: this.checkPath }
              ]
            })(<Input placeholder="接口路径,例: /api/v1/:id" />)}
          </FormItem>

          <FormItem label="接口描述" {...itemStyle}>
            {getFieldDecorator('desc', {
              initialValue: docContent.desc
            })(<TextArea rows={4} placeholder="项目描述，支持markdown" />)}
          </FormItem>

          <FormItem label="请求方法" {...itemStyle}>
            {getFieldDecorator('method', {
              initialValue: docContent.method ? docContent.method.toUpperCase() : 'GET',
              rules: [{ required: true, message: '请选择请求方法' }]
            })(
              <RadioGroup className="m-method-radio">
                <Radio.Button value="GET">GET</Radio.Button>
                <Radio.Button value="POST">POST</Radio.Button>
                <Radio.Button value="PUT">PUT</Radio.Button>
                <Radio.Button value="DELETE">DELETE</Radio.Button>
                <Radio.Button value="OPTIONS">OPTIONS</Radio.Button>
                <Radio.Button value="PATCH">PATCH</Radio.Button>
              </RadioGroup>
            )}
          </FormItem>

          <FormItem label="请求类型" {...itemStyle} wrapperCol={{ span: 20 }}>
            {getFieldDecorator('requestType', {
              initialValue: docContent.requestType || 'JSON',
              rules: [{ required: true, message: '请求参数类型' }]
            })(
              <RadioGroup>
                <Radio.Button value="JSON">JSON</Radio.Button>
                <Radio.Button value="X-WWW-FORM-URLENCODED">X-WWW-FORM-URLENCODED</Radio.Button>
                <Radio.Button value="FORM-DATA">FORM-DATA</Radio.Button>
              </RadioGroup>
            )}
          </FormItem>

          <Row className="doc-item">
            <Col span={2} className="item-label">
              请求参数 :
            </Col>
            <Col span={16}>
              <Tabs defaultActiveKey="1" type="card" className="edit-tabs">
                <TabPane tab="请求参数" key="1">
                  {this.getReqParams(reqBody)}
                </TabPane>
                <TabPane tab="请求头" key="2">
                  <EditTable paramList={reqHeader} onChange={this.handleReqHeader} showRequired />
                </TabPane>
              </Tabs>
            </Col>
          </Row>

          <FormItem label="响应类型" {...itemStyle}>
            {getFieldDecorator('responseType', {
              initialValue: docContent.responseType || 'JSON',
              rules: [{ required: true, message: '响应类型' }]
            })(
              <RadioGroup>
                <Radio.Button value="JSON">JSON</Radio.Button>
                <Radio.Button value="JSONP">JSONP</Radio.Button>
              </RadioGroup>
            )}
          </FormItem>

          <Row className="doc-item">
            <Col span={2} className="item-label">
              响应数据 :
            </Col>
            <Col span={16}>
              <Tabs defaultActiveKey="1" type="card" className="edit-tabs">
                <TabPane tab="响应数据" key="1">
                  <AceEditor
                    mode="javascript"
                    theme="github"
                    value={resBody}
                    onChange={this.handleResBody}
                    name="response json"
                    width="100%"
                    minLines={10}
                    maxLines={50}
                    className="ace-editor"
                    showPrintMargin={false}
                    showGutter
                    editorProps={{ $blockScrolling: true }}
                  />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
          <Row className="doc-item">
            <Col span={2} className="item-label" />
            <Col span={16}>
              <Button
                type="default"
                onClick={() => {
                  history.goBack()
                }}
              >
                取消
              </Button>
              <Button type="primary" style={{ marginLeft: '20px' }} onClick={this.saveDoc}>
                确定
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default Form.create()(EditDoc)
