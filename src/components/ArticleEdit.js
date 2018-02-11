import React, { Component } from 'react';
import { Table, Popconfirm, Button } from 'antd';
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

class ArticleEdit extends Component {
  constructor() {
    super()
    this.state = {
      data: ''
    }
  }

  componentWillMount() {
    this.getData(this.props.match.id)
  }

  getData = (id) => {
    axios
    .get(`http://localhost:3000/api/articles/${id}`)
    .then(res => {
      console.log(res.data)
      this.setState({ data: res.data})
    })
  }
  
  render() {
    return (
      <div className="edit">
        <ReactMarkdown source={this.state.data} />
      </div>
    )
  }
}

export default ArticleEdit