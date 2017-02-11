import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import APICredentials from '../config/APICredentials';

//This is super sloppy, I know.  However, I don't know enough about 'this' to be able to pass
// this to completeNewPasswordChallenge without going this way.  I want to change this very badly.
const authenticationHandler = {

    cognitoUser: null,

    newPasswordRequiredCallback: null,

    onSuccessCallback: null,

    onFailureCallback: null,

    setJWTToken: null,

    onSuccess: function(result) {
        console.log('access token')
        console.log(result.getAccessToken().getJwtToken())
        this.setJWTToken(result.getAccessToken().getJwtToken())
        this.onSuccessCallback(result.getAccessToken().getJwtToken())
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

    newPasswordRequired: function(userAttributes, requiredAttributes) {
        //TODO:  clearly this is going to change
        console.log('userAttributes');
        console.log(userAttributes);
        console.log('requiredAttributes');
        console.log(requiredAttributes)
        let newPassword = this.newPasswordRequiredCallback();
        this.cognitoUser.completeNewPasswordChallenge(newPassword, { preferred_username: "dummy" }, this);
    }
}

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
                });
            }
        }
        return isLoggedIn;
    }

    //use case 4
    login(username, password, onSuccessCallback, onFailureCallback, newPasswordRequiredCallback) {
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
        authenticationHandler.newPasswordRequiredCallback = newPasswordRequiredCallback;

        this.cognitoUser.authenticateUser(
            new AuthenticationDetails({
                Username: username,
                Password: password
            }),
            authenticationHandler
        );
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