import React, { Component } from 'react';
import { Table, Popconfirm, Button, Row, Col } from 'antd';
import axios from 'axios'
import ReactMarkdown   from 'react-markdown'
import CodeMirror from 'react-codemirror'
import { Link } from 'react-router-dom'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown'


class ArticleEdit extends Component {
  constructor() {
    super()
    this.state = {
      content: 'good'
    }
  }

  componentWillMount() {
    this.getData(this.props.match.params.id)
  }

  updateCode = (newCode) => {
		this.setState({
			content: newCode
		})
	}

  getData = (id) => {
    axios
    .get(`http://localhost:3000/api/articles/${id}`)
    .then(res => {
      this.setState({ content: res.data.content })

      this.refs.code.getCodeMirror().doc.setValue(this.state.content)
    })
  }
  
  render() {
    const options = {
      lineNumbers: true,
      mode: 'markdown'
    }
    return (
        <Row>
          <Col col={24}>
            <Link to="/list"><Button type="default" style={{ margin: '10px' }} >返回</Button></Link>
            <Button type="primary" style={{ margin: '10px' }}>提交</Button>
          </Col>
          <Col md={12} sm={24}>
            <CodeMirror value={this.state.content} ref="code" onChange={this.updateCode} options={options} />
          </Col>
          <Col md={12} sm={24}>
            <ReactMarkdown source={this.state.content} />
          </Col>
        </Row>
    )
  }
}

export default ArticleEdit