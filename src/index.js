import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/screens/App/index';
import SignUp from './app/screens/App/screens/SignUp/index';
import Login from './app/screens/App/screens/Login/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Router, Route, hashHistory } from 'react-router';

ReactDOM.render((
  <Router history={hashHistory}>
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
  </Router>
), document.getElementById('root'));
