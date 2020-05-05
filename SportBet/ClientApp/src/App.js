import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Wallet } from './components/Wallet';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <title>Sportska kladionica</title>
            <Route exact path='/' component={Home} />
            <Route path='/Wallet' component={Wallet} /> 
      </Layout>
    );
  }
}
