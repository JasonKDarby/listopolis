const { CognitoUser, CognitoUserPool, CognitoUserAttribute } = window.AWS.CognitoIdentityServiceProvider;

const userPool = new CognitoUserPool({

});

const SignUp = (request) => {
    request.body.googleToken
    var name = request.pathParams.name;
    return "Hello World - meet "+name;
};

export default SignUp;
