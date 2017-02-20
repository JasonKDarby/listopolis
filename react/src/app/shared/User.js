import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import APICredentials from '../config/APICredentials';
import { hashHistory } from 'react-router';

//TODO: refactor, avoid using classes

const authenticationHandler = {

    onSuccessCallback: null,

    onFailureCallback: null,

    setJWTToken: null,

    setAdminCreatedAccountCompletionRequired: null,

    onSuccess: function(result) {
        this.setJWTToken(result.getIdToken().getJwtToken())
        this.onSuccessCallback(result.getIdToken().getJwtToken())
    },

    onFailure: function(error) {
        console.log('authentication error')
        console.log(JSON.stringify(error))
        this.onFailureCallback(error)
    },

    mfaRequired: function(codeDeliveryDetails) {
        alert('mfaRequired not implemented');
        alert(codeDeliveryDetails);
    },

    customChallenge: function(whoKnows) {
        alert('customChallenge not implemented');
        alert(whoKnows);
    },

    newPasswordRequired: function(userAttributes, requiredAttributes) {
        this.setAdminCreatedAccountCompletionRequired(true);
        hashHistory.push('/adminCreatedAccountCompletion');
    }
}

export default class {

    cognitoUser = null;

    jwtToken = null;

    adminCreatedAccountCompletionRequired = false;

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
        this.cognitoUser.confirmRegistration(code, false,
            (error, result) => error ? onFailure(error) : onSuccess(result)
        );
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
                    this.jwtToken = session.getIdToken().getJwtToken();
                });
            }
        }
        return isLoggedIn;
    }

    //use case 4
    login(username, password, onSuccessCallback, onFailureCallback) {
        this.cognitoUser = new CognitoUser({
            Username: username,
            Pool: new CognitoUserPool({
                UserPoolId: APICredentials.cognitoUserPoolId,
                ClientId: APICredentials.cognitoAppClientId
            })
        });

        authenticationHandler.cognitoUser = this.cognitoUser;
        authenticationHandler.setJWTToken = (jwtToken) => this.jwtToken = jwtToken;
        authenticationHandler.onSuccessCallback = onSuccessCallback;
        authenticationHandler.onFailureCallback = onFailureCallback;
        authenticationHandler.setAdminCreatedAccountCompletionRequired =
            (required) => this.adminCreatedAccountCompletionRequired = required;

        this.cognitoUser.authenticateUser(
            new AuthenticationDetails({
                Username: username,
                Password: password
            }),
            authenticationHandler
        );
    }

    completeAdminCreatedAccountSignup(newPassword, email, onSuccessCallback, onFailureCallback) {
        authenticationHandler.cognitoUser = this.cognitoUser;
        authenticationHandler.setJWTToken = (jwtToken) => this.jwtToken = jwtToken;
        authenticationHandler.onSuccessCallback = onSuccessCallback;
        authenticationHandler.onFailureCallback = onFailureCallback;
        authenticationHandler.setAdminCreatedAccountCompletionRequired =
            (required) => this.adminCreatedAccountCompletionRequired = required;
        this.cognitoUser.completeNewPasswordChallenge(newPassword, { email: email }, authenticationHandler);
    }

    //use case 14
    logout() { this.cognitoUser.signOut(); this.jwtToken = null };

    //use case 11
    changePassword(oldPassword, newPassword, onSuccess, onFailure) {
    }

    //use case 13
    deleteUser(onSuccess, onFailure) {
        this.cognitoUser.deleteUser((error, result) => error ? onFailure(error) : onSuccess(result));
    }

}