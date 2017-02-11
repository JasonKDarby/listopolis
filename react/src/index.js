import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import Welcome from './app/screens/Welcome/index';
import Login from './app/screens/Welcome/screens/Login/index';
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

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute onEnter={unauthRequired} component={Welcome} />
            <Route path="/login" onEnter={unauthRequired} component={Login} />
            <Route
                onEnter={authRequired}
                component={ (props) => (<LoggedInHeader user={user} history={hashHistory} {...props} />) }
            >
                <Route path="/main" component={Main} />
                <Route path="/list" component={List} />
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));