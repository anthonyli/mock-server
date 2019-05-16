import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Icon, Checkbox, Radio } from 'antd'
import './index.less'

const RadioGroup = Radio.Group
class EditTable extends Component {
  static propTypes = {
    paramList: PropTypes.any,
    showDataType: PropTypes.any,
    onChange: PropTypes.any,
    showRequired: PropTypes.any,
    readOnly: PropTypes.any
  }
  constructor(props, context) {
    super(props, context)
    let propsParams = props.paramList
    this.state = {
      paramList: props.readOnly
        ? propsParams || []
        : propsParams && propsParams.length > 0
        ? propsParams.concat([
            { id: propsParams[propsParams.length - 1].id + 1, isrequired: false, dataType: 'text' }
          ])
        : [{ id: 0, isrequired: false, dataType: 'text' }],
      showDataType: props.showDataType,
      showRequired: props.showRequired
    }
  }
  componentWillReceiveProps(nextProps) {
    let propsParams = nextProps.paramList
    this.state = {
      paramList: nextProps.readOnly
        ? propsParams || []
        : propsParams && propsParams.length > 0
        ? propsParams.concat([
            { id: propsParams[propsParams.length - 1].id + 1, isrequired: false, dataType: 'text' }
          ])
        : [{ id: 0, isrequired: false, dataType: 'text' }],
      showDataType: nextProps.showDataType,
      showRequired: nextProps.showRequired
    }
  }
  handleName(param, e) {
    let paramList = this.state.paramList
    const paramId = param.id
    if (!param.parentPath && paramId === paramList[paramList.length - 1].id) {
      paramList.push({ id: paramId + 1, isrequired: false, dataType: 'text' })
    }
    param.name = e.target.value

    this.triggerChange(paramList)
  }
  handleDataType(param, e) {
    let paramList = this.state.paramList
    param.dataType = e.target.value

    this.triggerChange(paramList)
  }
  handleRequired(param, e) {
    let paramList = this.state.paramList
    param.isRequired = e.target.checked
    this.triggerChange(paramList)
  }
  handleDesc(param, e) {
    let paramList = this.state.paramList
    param.desc = e.target.value

    this.triggerChange(paramList)
  }
  handleDefaultValue(param, e) {
    let paramList = this.state.paramList
    if (e.target.value && param.dataType.indexOf('array') > -1) {
      try {
        param.valueInvalid = false
        JSON.parse(e.target.value)
      } catch (e) {
        param.valueInvalid = true
      }
    }
    param.defaultValue = e.target.value
    this.triggerChange(paramList)
  }
  deleteParam(param) {
    let paramList = this.state.paramList
    if (param.parentPath) {
      const parentPaths = param.parentPath.split('_')
      let parent
      let brotherList = paramList
      parentPaths.map(id => {
        parent = brotherList.find(p => p.id === id)
        brotherList = parent.children
      })
      parent.children = parent.children.filter(p => p.id !== param.id)
    } else {
      if (paramList.length === 1) {
        return
      }
      paramList = paramList.filter(p => {
        return p.id !== param.id
      })
    }
    this.setState({
      paramList: paramList
    })
    this.triggerChange(paramList)
  }
  addParam = param => {
    const paramList = this.state.paramList
    const paramId = param.id
    const parentPath = param.parentPath ? `${param.parentPath}_${paramId}` : `${paramId}`
    const children = param.children
    const pid = children.length ? children[children.length - 1].id + 1 : 0
    children.push({ id: pid, isrequired: false, dataType: 'string', parentPath: parentPath })
    this.setState({
      paramList: paramList
    })
  }
  triggerChange(data) {
    const copyParam = JSON.parse(JSON.stringify(data)) // 参数对象中不含function，所以用这个方法进行深拷贝
    const params = this.filterParam(copyParam)
    this.props.onChange(params)
  }
  filterParam(data) {
    data.forEach((p, i) => {
      if (!p.name) {
        data.splice(i, 1)
      }
      if (p.children) {
        p.children = this.filterParam(p.children)
      }
    })
    return data
  }

  fillParentPath(params) {
    params.map(param => {
      if (param.children) {
        const paramId = param.id
        param.children.map((p, i) => {
          p.id = i
          const parentPath = param.parentPath ? `${param.parentPath}_${paramId}` : `${paramId}`
          p.parentPath = parentPath
        })
        this.fillParentPath(param.children)
      }
    })
    return params
  }

  inputJsx(param, key, level) {
    level = level || 0
    return (
      <div key={`param-${key}`} className="table-body table-line">
        <ul className="clearfix param-row">
          {this.props.readOnly ? null : (
            <li className="operate-icons ant-col-2">
              <Icon
                type="minus-circle-o"
                onClick={() => {
                  this.deleteParam(param)
                }}
              />
              {param.dataType === 'object' || param.dataType === 'array[object]' ? (
                <Icon type="plus-circle-o" className="ml-10" onClick={this.addParam} />
              ) : null}
            </li>
          )}
          <li className="ant-col-3 input">
            {this.props.readOnly ? (
              <span>{param.name}</span>
            ) : (
              <Input
                style={{ paddingLeft: `${10 + 20 * level}px` }}
                value={param.name}
                onChange={e => {
                  this.handleName(param, e)
                }}
              />
            )}
          </li>
          {this.state.showDataType ? (
            <li className="ant-col-6">
              <RadioGroup
                disabled={this.props.readOnly}
                onChange={this.handleDataType}
                value={param.dataType}
              >
                <Radio value="text">text</Radio>
                <Radio value="file">file</Radio>
              </RadioGroup>
            </li>
          ) : null}
          {this.state.showRequired && (
            <li className="ant-col-3" style={{ textAlign: 'center' }}>
              <Checkbox
                disabled={this.props.readOnly}
                checked={param.isRequired}
                onChange={e => {
                  this.handleRequired(param, e)
                }}
              />
            </li>
          )}
          <li className={`ant-col-4 input ${param.valueInvalid ? 'error' : ''}`}>
            {this.props.readOnly ? (
              <span>{param.defaultValue}</span>
            ) : (
              <Input
                value={param.defaultValue}
                onChange={e => {
                  this.handleDefaultValue(param, e)
                }}
              />
            )}
          </li>
          <li className="ant-col-6 input">
            {this.props.readOnly ? (
              <span>{param.desc}</span>
            ) : (
              <Input
                value={param.desc}
                onChange={e => {
                  this.handleDesc(param, e)
                }}
              />
            )}
          </li>
          {param.children && param.children.length > 0
            ? param.children.map((param, i) => this.inputJsx(param, `l${level}-${i}`, level + 1))
            : null}
        </ul>
      </div>
    )
  }
  render() {
    const paramList = this.state.paramList
    return (
      <div className="edit-table">
        <div className="table-header table-line">
          <ul className="clearfix">
            {this.props.readOnly ? null : <li className="ant-col-2">操作</li>}
            <li className="ant-col-3">参数名</li>
            {this.state.showDataType ? <li className="ant-col-6">参数类型</li> : null}

            {this.state.showRequired && <li className="ant-col-3">是否必填</li>}
            <li className="ant-col-4">默认值</li>
            <li className="ant-col-6">描述</li>
          </ul>
        </div>
        {paramList.map((param, i) => {
          return this.inputJsx(param, i)
        })}
      </div>
    )
  }
}

export default EditTable
