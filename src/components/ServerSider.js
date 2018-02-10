import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';


class ServerSider extends Component {
  render() {
    const { Header, Content, Footer, Sider } = Layout;

    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <div className="logo">
          
          <span><Icon type="smile-o" />  BlogMS</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">博客概况</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">新增文章</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">文章管理</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="user" />
            <span className="nav-text">后台管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default ServerSider