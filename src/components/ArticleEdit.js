import React, { Component } from 'react';
import { Table, Popconfirm, Button, Row, Col, Input, Alert } from 'antd';
import ReactMarkdown   from 'react-markdown'
import CodeMirror from 'react-codemirror'
import { Link } from 'react-router-dom'
import { AsciiToUnicode, UnicodeToAscii } from '../helper'
import db from './firebaseInit'
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
      desc: '',
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
    // axios
    // .get(`http://localhost:3000/api/articles/${id}`)
    // .then(res => {
    //   const content = UnicodeToAscii(res.data.content)
    //   const title = res.data.title
    //   const topic = res.data.topic.join('-')
    //   const desc = res.data.desc
    //   const date = res.data.date._when
    //   const count = res.data.count
    //   this.setState({ content, title, topic, desc, date })

    //   this.refs.code.getCodeMirror()
    //     .doc.setValue(content)
    // })
  }

  handleSubmit = (content) => {
    // const unicode = AsciiToUnicode(content)
    // const ascii = UnicodeToAscii(unicode)

    if(!this.state.newArticles) {
      const id = this.props.match.params.id
      // axios
      // .patch(`http://localhost:3000/api/articles/${id}`, data)
      // .then(res => {
      //   console.log(res.data)
      //   this.setState({ showTips: true })
      //   setTimeout(() => {
      //     this.setState({ showTips: false })
      //   },1200)
      // })
    } else {
      db.collection('articles').add({
        id: this.state.articleId,
        title: this.state.title,
        content: this.state.content,
        date: new Date(),
        desc: this.state.desc,
        topic: this.state.topic.split('-')
      })
      .then(docRef => {
        console.log('Client added: ', docRef.id)
        this.setState({ showTips: true })
          setTimeout(() => {
            this.setState({ showTips: false })
          },1200)
      })
      .catch(error => {
        console.error('Error adding employee: ', error)
      })
    }
      // axios
      //   .post(`http://localhost:3000/api/articles`, data)
      //   .then(res => {
      //     console.log(res.data)
      //     this.setState({ showTips: true })
      //     setTimeout(() => {
      //       this.setState({ showTips: false })
      //     },1200)
      //   })
    // }
    
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
            <Input placeholder="标题ID(用于标示文档)" ref="articleId" style={{ width: '70%', marginRight: '2%' }} name="articleId" value={this.state.articleId} onChange={e => this.updateInput(e)}/>
            <Input placeholder="类别" ref="topic" style={{ width: '28%'}} value={this.state.topic} name="topic" onChange={e => this.updateInput(e)} />
            <Input placeholder="简介" ref="desc" style={{ width: '70%', marginRight: '2%'}} value={this.state.desc} name="desc" onChange={e => this.updateInput(e)} />
            <Input placeholder="发布时间" ref="date" style={{ width: '28%'}} value={this.state.date} name="date" onChange={e => this.updateInput(e)} />
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