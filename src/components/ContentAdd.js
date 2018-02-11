import React, { Component } from 'react';
import { Table, Popconfirm, Button, Form, Input } from 'antd';
import axios from 'axios'
import ArticleEdit from './ArticleEdit';

class ContentAdd extends React.Component {
  render() {
    return (
      <div>
        <ArticleEdit />
      </div>
    );
  }
}

export default ContentAdd