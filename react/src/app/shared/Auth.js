//http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
import singleton from 'singleton'
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import APICredentials from '../config/APICredentials'

//AWS.config.region = 'us-east-1'

class Auth extends singleton {

    get isLoggedIn() {

    }

    login(username, password, onSuccess, onFailure) {
        console.log(`attempt to login with username: ${username}, password: ${password}`)
        let authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        })
        let poolData = {
            UserPoolId: APICredentials.cognitoUserPoolId,
            ClientId: APICredentials.cognitoAppClientId
        }
        let userPool = new CognitoUserPool(poolData)
        let userData = {
            Username: username,
            Pool: userPool
        }
        let cognitoUser = new CognitoUser(userData)

        let authenticateUserHandler = {
            onSuccess: (result) => {
                console.log('onSuccess')
                console.log('result')
                console.log(result)
            },
            onFailure: (error) => {
                console.log('onFailure')
                console.log('error')
                console.log(error)
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.
                console.log('newPasswordRequired')
                console.log('userAttributes')
                console.log(userAttributes)
                console.log('requiredAttributes')
                console.log(requiredAttributes)

                // the api doesn't accept this field back
                delete userAttributes.email_verified

                userAttributes.preferred_username = 'dummyUsername'

                let newPassword = 'dummyPassword'

                console.log('authenticateUserHandler')
                console.log(authenticateUserHandler)
                // Get these details and call
                cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, authenticateUserHandler)
            }
        }

        cognitoUser.authenticateUser(authenticationDetails, authenticateUserHandler)
    }

    logout() {

    }
}

export default Auth.get()