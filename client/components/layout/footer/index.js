import './index.less'
import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Icon } from 'antd'

const version = process.env.version

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static propTypes = {
    footList: PropTypes.array
  }
  render() {
    return (
      <div className="footer-wrapper">
        <Row className="footer-container">
          {this.props.footList.map(function(item, i) {
            return (
              <FootItem
                key={i}
                linkList={item.linkList}
                title={item.title}
                iconType={item.iconType}
              />
            )
          })}
        </Row>
      </div>
    )
  }
}

class FootItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static propTypes = {
    linkList: PropTypes.array,
    title: PropTypes.string,
    iconType: PropTypes.string
  }
  render() {
    return (
      <Col span={6}>
        <h4 className="title">
          {this.props.iconType ? <Icon type={this.props.iconType} className="icon" /> : ''}
          {this.props.title}
        </h4>
        {this.props.linkList.map(function(item, i) {
          return (
            <p key={i}>
              <a href={item.itemLink} className="link">
                {item.itemTitle}
              </a>
            </p>
          )
        })}
      </Col>
    )
  }
}

Footer.defaultProps = {
  footList: [
    {
      title: 'GitHub',
      iconType: 'github',
      linkList: [
        {
          itemTitle: 'mAPI 源码仓库',
          itemLink: 'https://github.com/anthonyli/mAPI'
        }
      ]
    },
    {
      title: '反馈',
      iconType: 'aliwangwang-o',
      linkList: [
        {
          itemTitle: 'Github Issues',
          itemLink: 'https://github.com/anthonyli/mAPI/issues'
        },
        {
          itemTitle: 'Github Pull Requests',
          itemLink: 'https://github.com/anthonyli/mAPI/pulls'
        }
      ]
    },
    {
      title: 'Copyright © 2019 Anthony Li',
      linkList: [
        {
          itemTitle: `版本: ${version} `,
          itemLink: 'https://github.com/anthonyli/mAPI/blob/master/CHANGELOG.md'
        }
      ]
    }
  ]
}

export default Footer
