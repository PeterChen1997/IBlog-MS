import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {
  Link
} from 'react-router-dom'


class ServerSider extends Component {
  parsePath = (path) => {
    switch(path) {
      case '/': return ['1']
      case '/add': return ['2']
      case '/list': return ['3']
      case '/edit': return ['3']
      case '/management': return ['4']
    }
  }

  render() {
    const { Header, Content, Footer, Sider } = Layout;
    const path = `/${window.location.pathname.split('/')[1]}`
    const urlValue = this.parsePath(path)
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        className="sider"
      >
        <div className="logo">
          <span>BlogMS</span>
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={urlValue}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">博客概况</span>
            <Link to="/"></Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">新增文章</span>
            <Link to="/add"></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">文章管理</span>
            <Link to="/list"></Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="user" />
            <span className="nav-text">后台管理</span>
            <Link to="management"></Link>
          </Menu.Item>
        </Menu>
        
      </Sider>
    )
  }
}

export default ServerSider