import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import APICredentials from '../config/APICredentials';

export default class {

    cognitoUser = null;

    jwtToken = null;

    //use case 1
    signUp(username, password, preferredUsername, onSuccess, onFailure) {
        let userPool = new CognitoUserPool({
            UserPoolId: APICredentials.cognitoUserPoolId,
            ClientId: APICredentials.cognitoAppClientId
        });

        let attributeList = [];

        let dataPreferredUsername = {
            Name: 'preferred_username',
            Value: preferredUsername
        };

        let attributePreferredUsername = new CognitoUserAttribute(dataPreferredUsername);

        attributeList.push(attributePreferredUsername);

        userPool.signUp(username, password, attributeList, null, (error, result) => {
            if(error) {
                console.log('signUp failure error');
                console.log(error);
                onFailure(error);
            } else {
                console.log('signUp result');
                console.log(JSON.stringify(result));
                this.cognitoUser = result.user;
                onSuccess();
            }
        });
    }

    confirmSignUp(code, onSuccess, onFailure) {
        this.cognitoUser.confirmRegistration(code, false, (error, result) => {
            if(error) {
                console.log('confirmSignUp error');
                console.log(JSON.stringify(error));
                onFailure(error);
            } else {
                console.log('confirmSignUp success');
                onSuccess(result);
            }
        })
    }

    get isLoggedIn() {
        let isLoggedIn = false;
        if(this.cognitoUser) {
            if(this.cognitoUser.getSignInUserSession()) {
                if(this.cognitoUser.getSignInUserSession().isValid()) {
                    isLoggedIn = true;
                }
            }
        } else {
            let userPool = new CognitoUserPool({
                UserPoolId : APICredentials.cognitoUserPoolId,
                ClientId : APICredentials.cognitoAppClientId
            });
            let cognitoUser = userPool.getCurrentUser();

            if (cognitoUser != null) {
                cognitoUser.getSession((error, session) => {
                    if (error) {
                        alert(error);
                        return false;
                    }
                    isLoggedIn = session.isValid();
                    this.cognitoUser = cognitoUser;
                });
            }
        }
        return isLoggedIn;
    }

    //use case 4
    login(username, password, onLoginSuccess, onLoginFailure) {
        let authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        });

        let userPool = new CognitoUserPool({
            UserPoolId: APICredentials.cognitoUserPoolId,
            ClientId: APICredentials.cognitoAppClientId
        });

        this.cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool
        });

        let createAuthenticationHandler = (successFunction, failureFunction) => {
            return {
                onSuccess: (result) => {
                    console.log('access token')
                    console.log(result.getAccessToken().getJwtToken())
                    this.jwtToken = result.getAccessToken().getJwtToken()
                    successFunction(result.getAccessToken().getJwtToken())
                },
                onFailure: (error) => {
                    console.log('authentication error')
                    console.log(JSON.stringify(error))
                    failureFunction(error)
                }
            }
        };

        this.cognitoUser.authenticateUser(
            authenticationDetails,
            createAuthenticationHandler(onLoginSuccess, onLoginFailure)
        );
    }

    //use case 14
    logout() { this.cognitoUser.signOut(); this.jwtToken = null };

    //use case 11
    changePassword(oldPassword, newPassword, onSuccess, onFailure) {
    }

    //use case 13
    deleteUser(onSuccess, onFailure) {
        this.cognitoUser.deleteUser((error, result) => {
            if(error) {
                onFailure(error);
            } else {
                onSuccess(result);
            }
        });
    }

}