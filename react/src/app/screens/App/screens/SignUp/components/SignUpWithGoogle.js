import React from 'react';
import GoogleLogin from 'react-google-login';

//http://stackoverflow.com/questions/20159782/how-can-i-decode-a-google-oauth-2-0-jwt-openid-connect-in-a-node-app
function decodeJWT(token) {
    var segments = token.split('.');

    if (segments.length !== 3) {
        throw new Error('Not enough or too many segments');
    }

    // All segment should be base64
    var headerSeg = segments[0];
    var payloadSeg = segments[1];
    var signatureSeg = segments[2];

    // base64 decode and parse JSON
    var header = JSON.parse(base64urlDecode(headerSeg));
    var payload = JSON.parse(base64urlDecode(payloadSeg));

    return {
        header: header,
        payload: payload,
        signature: signatureSeg
    }

}

function base64urlDecode(str) {
    return new Buffer(base64urlUnescape(str), 'base64').toString();
};

function base64urlUnescape(str) {
    str += Array(5 - str.length % 4).join('=');
    return str.replace(/\-/g, '+').replace(/_/g, '/');
}

const responseGoogle = (response) => {
    console.log("response");
    console.log(response);
    var decoded = decodeJWT(response.tokenId);
    console.log("decoded");
    console.log(decoded);
}

const SignUpWithGoogle = () => (
    <div>
        <GoogleLogin
            clientId="some client id"
            buttonText="Sign up with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    </div>
);

export default SignUpWithGoogle;
