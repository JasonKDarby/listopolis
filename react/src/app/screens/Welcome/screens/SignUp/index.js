import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SignUpWithGoogle from './components/SignUpWithGoogle'
import { hashHistory } from 'react-router'
import Auth from '../../../../Auth'
import LoggedOutHeader from '../../shared/LoggedOutHeader'

const googleSuccess = (response) => {
    console.log(response)
    console.log("authentication was successful")
    //TODO: I need to call to my backend signup and receive a client ID (along with whatever info)
    Auth.login(response.tokenId)
    hashHistory.push('/main')
};


const googleFailure = (response) => {
    console.log(response)

    console.log("authentication failed")
    Auth.logout()
};

//TODO:  uhh, all of it
const SignUp = (props) => (
    <div>
        <LoggedOutHeader/>
        <p>TEMPORARY SIGN UP PAGE</p>
        <SignUpWithGoogle
            onGoogleSignUpSuccess={googleSuccess}
            onGoogleSignUpFailure={googleFailure}
        />
        <LinkContainer to="/">
            <Button>Continue</Button>
        </LinkContainer>
    </div>
);

export default SignUp;