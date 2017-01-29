import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import Welcome from './app/screens/Welcome/index';
import SignUp from './app/screens/Welcome/screens/SignUp/index';
import Login from './app/screens/Welcome/screens/Login/index';
import Main from './app/screens/Welcome/screens/Login/screens/Main/index';
import List from './app/screens/Welcome/screens/Login/screens/Main/screens/List/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Auth from './app/Auth'
import LoggedInHeader from './app/screens/Welcome/screens/Login/screens/Main/shared/LoggedInHeader'

const authRequired = (nextState, replace) => {
    if(!Auth.isLoggedIn) {
        replace('/login')
    }
}

const unauthRequired = (nextState, replace) => {
    if(Auth.isLoggedIn) {
        replace('/main')
    }
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute onEnter={unauthRequired} component={Welcome} />
            <Route path="/login" onEnter={unauthRequired} component={Login} />
            <Route path="/signup" onEnter={unauthRequired} component={SignUp} />
            <Route onEnter={authRequired} component={LoggedInHeader}>
                <Route path="/main" component={Main} />
                <Route path="/list" component={List} />
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));
