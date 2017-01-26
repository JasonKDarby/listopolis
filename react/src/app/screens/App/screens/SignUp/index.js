import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SignUpWithGoogle from './components/SignUpWithGoogle';

//TODO:  uhh, all of it
const SignUp = () => (
    <div>
        <p>TEMPORARY SIGN UP PAGE</p>
        <SignUpWithGoogle/>
        <LinkContainer to="/">
            <Button>Continue</Button>
        </LinkContainer>
    </div>
);

export default SignUp;