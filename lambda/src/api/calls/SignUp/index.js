const SignUp = (request) => {
    var name = request.pathParams.name;
    return "Hello World - meet "+name;
};

export default SignUp;
