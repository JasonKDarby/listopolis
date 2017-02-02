import React from 'react';
import GoogleLogin from 'react-google-login';
import APICredentials from '../../../../../APICredentials'

const SignUpWithGoogle = ({ onGoogleSignUpSuccess, onGoogleSignUpFailure }) => (
    <GoogleLogin
        clientId={APICredentials.googleLoginClientId}
        buttonText="Sign up with Google"
        onSuccess={onGoogleSignUpSuccess}
        onFailure={onGoogleSignUpFailure}
    />
)

export default SignUpWithGoogle
