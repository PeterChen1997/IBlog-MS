import React, { Component } from 'react';
import { Table, Popconfirm, Button, Input } from 'antd';
import axios from 'axios'
import { Link } from 'react-router-dom'

const Search = Input.Search 

class ArticlesList extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      isLoading: true
    }
  }

  componentWillMount() {
    this.getArticles()
  }
  

  getArticles = () => {
    axios
      .get('http://localhost:3000/api/articles')
      .then(res => {
        this.setState({ articles: res.data, isLoading: false })
        console.log(this.state.articles)
      })
  }

  onDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/articles/${id}`)
      .then(res => {
        console.log(this.state.articles)
        this.setState({
          articles: this.state.articles.filter(article => article.id !== id)
        })
      })
  }

  onDeleteMore = () => {
    const keys = this.state.selectedKeys
    keys.map(key => this.onDelete(key))
  }

  handleSearch = (value) => {
    console.log(value)
    axios
      .get(`http://localhost:3000/api/articles?filter[where][content][regexp]=${value}`)
      .then(res => {
        console.log(res.data)
        this.setState({ articles: res.data})
      })
    // 防止2次叠加
    if(value === ''){
      return
    }
    axios
      .get(`http://localhost:3000/api/articles?filter[where][title][regexp]=${value}`)
      .then(res => {
        this.setState({ articles: this.state.articles.concat(res.data)})
    })
  }

  render() {
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      render: (text, record) => <a target="_blank" href={`http://localhost:3001/articles/${record.id}`}>{text}</a>
    },{
      title: '类别',
      dataIndex: 'topic',
      render: (text) => text
    }, {
      title: '浏览量',
      dataIndex: 'view',
      render: (text) => text
    },{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <div>
            <Link to={`/edit/${record.id}`}><Button type="primary">修改</Button></Link>
            <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(record.id)}>
              <Button type="danger">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedKeys: selectedRowKeys
        })
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div className="articles-list">
        <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDeleteMore()}>
            <Button type="danger">批量删除</Button>
        </Popconfirm>
        <Search
          placeholder="input search text"
          onSearch={value => this.handleSearch(value)}
          style={{ width: 200 }}
        />
        
        <Table loading={this.state.isLoading} rowSelection={rowSelection} columns={columns} dataSource={this.state.articles} rowKey={article => article.id} />
      </div>
    )
  }
}

export default ArticlesList