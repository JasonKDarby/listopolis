import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import Welcome from './app/screens/Welcome/index';
import Login from './app/screens/Welcome/screens/Login/index';
import AdminCreatedAccountCompletion from './app/screens/Welcome/screens/Login/screens/AdminCreatedAccountCompletion/index';
import Main from './app/screens/Welcome/screens/Login/screens/Main/index';
import List from './app/screens/Welcome/screens/Login/screens/Main/screens/List/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { user } from './app/shared/Store';
import LoggedInHeader from './app/screens/Welcome/screens/Login/screens/Main/shared/LoggedInHeader';

//Not really a fan of using null here but whatever
const authRequired = (nextState, replace) => !user.isLoggedIn ? replace('/login') : null;

const unauthRequired = (nextState, replace) => user.isLoggedIn ? replace('/main') : null;

const newPasswordRequired = (nextState, replace) =>
    !user.adminCreatedAccountCompletionRequired ? replace('/login') : unauthRequired(nextState, replace);

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute onEnter={unauthRequired} component={Welcome} />
            <Route path="/login" onEnter={unauthRequired} component={Login} />
            <Route
                path="/adminCreatedAccountCompletion"
                onEnter={newPasswordRequired}
                component={ (props) => (<AdminCreatedAccountCompletion user={user} {...props}/>)} />
            <Route
                onEnter={authRequired}
                component={ (props) => (<LoggedInHeader user={user} history={hashHistory} {...props} />) }
            >
                <Route path="/main" component={Main} />
                <Route path="/list/:id" component={List} />
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));