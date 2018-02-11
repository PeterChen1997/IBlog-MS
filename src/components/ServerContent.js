import React, { Component } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom'


import ArticlesList from './ArticlesList'
import ArticleEdit from './ArticleEdit'
import ContentHome from './ContentHome'
import ContentAdd from './ContentAdd'
import ContentManage from './ContentManage'

class ServerContent extends Component {
  render() {
    const { Content } = Layout;

    return (
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Switch>
            <Route exact path='/' component={ContentHome} />
            <Route exact path='/add' component={ContentAdd} />
            <Route exact path='/list' component={ArticlesList}/>
            <Route exact path='/edit/:id' component={ArticleEdit}/>
            <Route exact path='/management' component={ContentManage} />
          </Switch>
        </div>
      </Content>

    )
  }
}

export default ServerContent