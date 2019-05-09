import React, { Component } from 'react'
import { Modal, Tabs, Form, Input, Radio, Row, Col } from 'antd'
import AceEditor from 'react-ace'
import './index.less'

import 'brace/mode/javascript'
import 'brace/theme/github'

const TabPane = Tabs.TabPane
const FormItem = Form.Item
const RadioGroup = Radio.Group
class EditDoc extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showEditModal && !this.props.showEditModal) {
      this.props.form.resetFields()
      this.state = {}
    }
  }

  saveDoc() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return false
      }
      const editDoc = this.props.editDoc.toJS()
      const docContent = JSON.parse(editDoc.content || '{}')
      const docData = {
        id: editDoc.id,
        title: values.title,
        pid: editDoc.pid,
        categoryId: editDoc.categoryId,
        content: Object.assign({}, docContent, values, this.state)
      }
      this.props.saveDocument(docData)
    })
  }
  close() {
    this.props.closeEditApiDoc()
  }

  handleReqBody(value) {
    const doc = this.props.editDoc.toJS()
    const docContent = JSON.parse(doc.content || '{}')
    const reqType = this.props.form.getFieldValue('requestType')
    const reqBody = this.state.reqBody || docContent.reqBody || {}
    reqBody[reqType] = value
    this.setState({
      reqBody: reqBody
    })
  }
  handleReqHeader(reqHeader) {
    this.setState({
      reqHeader: reqHeader
    })
  }
  handleResBody(value) {
    this.setState({
      resBody: value
    })
  }
  handleResHeader(resHeader) {
    this.setState({ resHeader: resHeader })
  }

  checkPath(rule, value, callback) {
    const reg = new RegExp(/^\/[a-zA-Z0-9_-]+?/)
    if (!value || reg.test(value)) {
      callback()
    } else {
      callback(new Error('路径格式错误'))
    }
  }

  getReqParams(reqBody) {
    const reqType = this.props.form.getFieldValue('requestType')
    let reqInput
    switch (reqType) {
      case 'JSON':
        reqInput = (
          <AceEditor
            mode="javascript"
            theme="github"
            showPrintMargin={false}
            value={reqBody[reqType]}
            onChange={this.handleReqBody}
            name="request json"
            width="100%"
            minLines={5}
            maxLines={50}
            className="ace-editor"
            editorProps={{ $blockScrolling: true }}
            onLoad={editor => {
              editor.getSession().setUseWorker(false)
            }}
          />
        )
        break
      case 'FORM-DATA':
        reqInput = null
        break
      case 'X-WWW-FORM-URLENCODED':
        reqInput = null
        break
      default:
        reqInput = (
          <AceEditor
            mode="javascript"
            theme="github"
            showPrintMargin={false}
            value={reqBody}
            onChange={this.handleReqBody.bind(this)}
            name="request json"
            width="100%"
            minLines={5}
            maxLines={50}
            className="ace-editor"
            editorProps={{ $blockScrolling: true }}
            onLoad={editor => {
              editor.getSession().setUseWorker(false)
            }}
          />
        )
    }
    return reqInput
  }

  render() {
    const doc = this.props.editDoc.toJS()
    const docContent = JSON.parse(doc.content || '{}')
    const { getFieldDecorator } = this.props.form
    const reqBody = this.state.reqBody || docContent.reqBody || {}
    const reqHeader = this.state.reqHeader || docContent.reqHeader
    const resBody = this.state.resBody === undefined ? docContent.resBody : this.state.resBody
    const resHeader = this.state.resHeader || docContent.resHeader
    const title = doc.id ? '编辑文档' : '新建文档'

    const itemStyle = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      }
    }
    return (
      <div className="edit-doc">
        <Form className="mt-20">
          <FormItem label={`接口名 : `} {...itemStyle}>
            {getFieldDecorator('title', {
              initialValue: doc.title,
              rules: [{ required: true, message: '请输入接口名称' }]
            })(<Input placeholder="接口名称" />)}
          </FormItem>

          <FormItem label={`路径 : `} {...itemStyle}>
            {getFieldDecorator('pathName', {
              initialValue: docContent.pathName,
              rules: [
                { required: true, message: '请输入路径,例: /api/v3/test' },
                { validator: this.checkPath }
              ]
            })(<Input placeholder="接口路径,例: /api/v1/:id" />)}
          </FormItem>

          <FormItem label={`项目地址 : `} {...itemStyle}>
            {getFieldDecorator('gitUrl', {
              initialValue: docContent.gitUrl
            })(<Input placeholder="git项目地址" />)}
          </FormItem>

          <FormItem label={`线上地址 : `} {...itemStyle}>
            {getFieldDecorator('podHost', {
              initialValue: docContent.podHost
            })(<Input placeholder="线上地址" />)}
          </FormItem>

          <FormItem label={`测试地址 : `} {...itemStyle}>
            {getFieldDecorator('testHost', {
              initialValue: docContent.testHost
            })(<Input placeholder="测试地址" />)}
          </FormItem>

          <FormItem label={`接口描述 : `} {...itemStyle}>
            {getFieldDecorator('desc', {
              initialValue: docContent.desc
            })(
              <Input
                type="textarea"
                autosize={{ minRows: 5, maxRows: 10 }}
                placeholder="项目描述，支持markdown"
              />
            )}
          </FormItem>

          <FormItem label={`请求方法 : `} {...itemStyle}>
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

          <FormItem label={`请求类型 : `} {...itemStyle} wrapperCol={{ span: 20 }}>
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
            <Col span={4} className="item-label">
              请求参数 :{' '}
            </Col>
            <Col span={20}>
              <Tabs defaultActiveKey="1" type="card" className="edit-tabs">
                <TabPane tab="请求参数" key="1">
                  {this.getReqParams(reqBody)}
                </TabPane>
                <TabPane tab="请求头" key="2" />
              </Tabs>
            </Col>
          </Row>

          <FormItem label={`响应类型 : `} {...itemStyle}>
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
            <Col span={4} className="item-label">
              响应数据 :{' '}
            </Col>
            <Col span={20}>
              <Tabs defaultActiveKey="1" type="card" className="edit-tabs">
                <TabPane tab="响应数据" key="1">
                  {/* <EditTable showImport={true} showDataType={true} paramList={resBody} onChange={this.handleResBody.bind(this)} /> */}
                  <AceEditor
                    mode="javascript"
                    theme="github"
                    showPrintMargin={false}
                    value={resBody}
                    onChange={this.handleResBody.bind(this)}
                    name="response json"
                    width="100%"
                    minLines={5}
                    maxLines={50}
                    className="ace-editor"
                    editorProps={{ $blockScrolling: true }}
                    onLoad={editor => {
                      editor.getSession().setUseWorker(false)
                    }}
                  />
                </TabPane>
                <TabPane tab="响应头" key="2" />
              </Tabs>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default Form.create()(EditDoc)
