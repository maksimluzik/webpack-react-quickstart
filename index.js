import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import App from './src/App'

// Global Styles
import './assets/styles/bootstrap.css'
import './assets/styles/index.less'


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.getElementById('app'));
