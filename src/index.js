import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/screens/App/index';
import SignIn from './app/screens/App/screens/SignIn/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Router, Route, hashHistory } from 'react-router';

ReactDOM.render((
  <Router history={hashHistory}>
      <Route path="/" component={App}>

      </Route>
      <Route path="/login" component={SignIn} />
  </Router>
), document.getElementById('root'));
