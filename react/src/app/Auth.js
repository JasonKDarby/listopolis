//http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
import singleton from 'singleton'
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import APICredentials from './APICredentials'

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
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                console.log('result')
                console.log(result)
            },
            onFailure: (error) => {
                console.log('error')
                console.log(error)
            }
        })
    }

    logout() {

    }
}

export default Auth.get()