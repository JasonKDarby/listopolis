import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

//TODO:  uhh, all of it
const Login = () => (
    <div>
        <p>TEMPORARY LOGIN PAGE</p>
        <LinkContainer to="/main">
            <Button>Continue</Button>
        </LinkContainer>
    </div>
);

export default Login;