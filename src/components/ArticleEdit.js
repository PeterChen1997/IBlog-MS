import React, { Component } from 'react';
import { Table, Popconfirm, Button, Row, Col, Input, Alert } from 'antd';
import axios from 'axios'
import ReactMarkdown   from 'react-markdown'
import CodeMirror from 'react-codemirror'
import { Link } from 'react-router-dom'
import { AsciiToUnicode, UnicodeToAscii } from '../helper'
// import Lowlight from 'react-lowlight'
// import js from 'highlight.js/lib/languages/javascript'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown'


class ArticleEdit extends Component {
  constructor() {
    super()
    this.state = {
      newArticles: true,
      content: '',
      title: '',
      showTips: false
    }
  }

  componentWillMount() {
    if(this.props.match) {
      this.getData(this.props.match.params.id)
      this.setState({ newArticles: false})
    }
  }

  updateCode = (newCode) => {
		this.setState({
			content: newCode
		})
  }
  
  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getData = (id) => {
    axios
    .get(`http://localhost:3000/api/articles/${id}`)
    .then(res => {
      const content = UnicodeToAscii(res.data.content)
      const title = res.data.title
      const topic = res.data.topic.join('-')
      this.setState({ content, title, topic })

      this.refs.code.getCodeMirror()
        .doc.setValue(content)
    })
  }

  handleSubmit = (content) => {
    const unicode = AsciiToUnicode(content)
    const ascii = UnicodeToAscii(unicode)
    const data = {
      "content": unicode,
      "title": this.state.title,
      "topic": this.state.topic.split('-')
    }
    if(!this.state.newArticles) {
      const id = this.props.match.params.id
      axios
      .patch(`http://localhost:3000/api/articles/${id}`, data)
      .then(res => {
        console.log(res.data)
        this.setState({ showTips: true })
        setTimeout(() => {
          this.setState({ showTips: false })
        },1200)
      })
    } else {
      axios
        .post(`http://localhost:3000/api/articles`, data)
        .then(res => {
          console.log(res.data)
          this.setState({ showTips: true })
          setTimeout(() => {
            this.setState({ showTips: false })
          },1200)
        })
    }
    
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
            <Button type="primary" style={{ margin: '10px' }} onClick={() => this.handleSubmit(this.state.content)}>提交</Button>
            <Alert message="更新成功" type="success" showIcon banner={true} style={{visibility: this.state.showTips ? '' : 'hidden'}}/>
          </Col>
          <Col col={24} style={{ marginBottom: '20px'}}>
            <Input placeholder="标题" ref="title" style={{ width: '70%', marginRight: '2%' }} name="title" value={this.state.title} onChange={e => this.updateInput(e)}/>
            <Input placeholder="类别" ref="topic" style={{ width: '28%'}} value={this.state.topic} name="topic" onChange={e => this.updateInput(e)} />
          </Col>
          <Col md={12} sm={24} style={{height: '80vh', overflow: 'scroll'}}>
            <CodeMirror value={this.state.content} ref="code" onChange={this.updateCode} options={options} />
          </Col>
          <Col md={12} sm={24} style={{height: '80vh', overflow: 'scroll'}}>
            <ReactMarkdown source={this.state.content} />
          </Col>
        </Row>
    )
  }
}

export default ArticleEdit