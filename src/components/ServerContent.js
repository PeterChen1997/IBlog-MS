import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

import ArticlesList from './ArticlesList'

class ServerContent extends Component {
  render() {
    const { Header, Content, Footer, Sider } = Layout;

    return (
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <ArticlesList />
        </div>
      </Content>

    )
  }
}

export default ServerContent