import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import APICredentials from '../config/APICredentials'

class User {

    cognitoUser = null

    jwtToken = null

    signUp(username, password, preferredUsername, onSuccess, onFailure) {
        //use case 1
        let userPool = new CognitoUserPool({
            UserPoolId: APICredentials.cognitoUserPoolId,
            ClientId: APICredentials.cognitoAppClientId
        })

        let attributeList = []

        let dataPreferredUsername = {
            Name: 'preferred_username',
            Value: preferredUsername
        }

        let attributePreferredUsername = new CognitoUserAttribute(dataPreferredUsername)

        attributeList.push(attributePreferredUsername)

        return userPool.signUp(username, password, attributeList, null, (error, result) => {
            if(error) {
                console.log('signUp failure error')
                console.log(error)
                onFailure(error)
            }
            else {
                console.log('signUp result')
                console.log(JSON.stringify(result))
                this.cognitoUser = result.user
                onSuccess()
            }
        })
    }

    confirmSignUp(code, onSuccess, onFailure) {
        return this.cognitoUser.confirmRegistration(code, false, (error, result) => {
            if(error) {
                console.log('confirmSignUp error')
                console.log(JSON.stringify(error))
                onFailure(error)
            } else {
                console.log('confirmSignUp success')
                onSuccess(result)
            }
        })
    }

    get isLoggedIn() {
        let isLoggedIn = false
        if(this.cognitoUser) {
            if(this.cognitoUser.getSignInUserSession()) {
                console.log('user session')
                console.log(this.cognitoUser.getSignInUserSession())
                if(this.cognitoUser.getSignInUserSession().isValid()) {
                    console.log('user is signed in')
                    isLoggedIn = true
                }
            } else {
                console.log('user is not signed in')
            }
        }
        else {

        }
        return isLoggedIn
    }

    login(username, password, onLoginSuccess, onLoginFailure) {
        //use case 4
        let authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        })

        let userPool = new CognitoUserPool({
            UserPoolId: APICredentials.cognitoUserPoolId,
            ClientId: APICredentials.cognitoAppClientId
        })

        let cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool
        })

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
        }

        return cognitoUser.authenticateUser(authenticationDetails, createAuthenticationHandler(onLoginSuccess, onLoginFailure))
    }

    signOut() {
        //use case 14
        this.cognitoUser.signOut()
        this.jwtToken = null
        console.log('signed out user')
        console.log(JSON.stringify(this.cognitoUser))
    }

    changePassword(oldPassword, newPassword, onSuccess, onFailure) {
        //use case 11
    }

    deleteUser(onSuccess, onFailure) {
        //use case 13
        return this.cognitoUser.deleteUser((error, result) => {
            if(error) {
                console.log('error deleting user')
                console.log(error)
                onFailure(error)
            } else {
                console.log('successfully deleted user')
                console.log(result)
                onSuccess()
            }
        })
    }

}

export default User