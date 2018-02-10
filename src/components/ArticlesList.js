import React, { Component } from 'react';
import { Table, Popconfirm, Button } from 'antd';
import axios from 'axios'

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

  render() {
    const columns = [{
      title: '题目',
      dataIndex: 'title',
      render: (text, record) => <a target="_blank" href={`http://localhost:3001/articles/${record.id}`}>{text}</a>
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <div>
            <Button type="primary">修改</Button>
            <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(record.id)}>
              <Button type="danger">删除</Button>
            </Popconfirm>
          </div>
          
        )
      }
    }]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div className="articles-list">
        <Button type="default">新增</Button>
        <Button type="danger">批量删除</Button>
        <Table loading={this.state.isLoading} rowSelection={rowSelection} columns={columns} dataSource={this.state.articles} rowKey={article => article.id} />
      </div>
    )
  }
}

export default ArticlesList