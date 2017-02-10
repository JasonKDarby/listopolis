//noinspection JSUnresolvedVariable
const APICredentials = {
    cognitoUserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
    cognitoAppClientId: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
    awsCognitoIdentityPoolId: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
    googleLoginClientId: process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID
}

export default APICredentials