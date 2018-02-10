import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import ServerSider from './components/ServerSider'
import ServerHeader from './components/ServerHeader'
import ServerContent from './components/ServerContent'

import './App.css';


class App extends Component {
  constructor() {
    super()
  }

  render() {
    const { Header, Content, Footer, Sider } = Layout;
    return (
      <div className="App">
        <Router>
          <Layout>
            <ServerSider />
            <Layout>
              <ServerHeader />
              <ServerContent />
              <Footer style={{ textAlign: 'center' }}>
                Peter Chen ©2018 Created by AntD + React
              </Footer>
            </Layout>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
