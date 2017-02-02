//http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
import singleton from 'singleton'
import Cookies from 'js-cookie'
import AWS from 'aws-sdk'
import APICredentials from './APICredentials'

AWS.config.region = 'us-east-1'

class Auth extends singleton {

    get isLoggedIn() {
        let isLoggedIn = false
        let authCookie = Cookies.get('auth')
        if(!authCookie) {
            //if auth cookie doesn't exist
            //we return false
        } else {
            //check if the cookie is still valid according to it's expiration
            isLoggedIn = true
        }
        return isLoggedIn
    }

    login(token, onSuccess, onFailure) {
        //send off to auth service, service should set a cookie
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: APICredentials.awsCognitoIdentityPoolId,
            Logins: {
                'accounts.google.com': token
            }
        })
        AWS.config.credentials.get((error) => {
            if(error) {
                onFailure(error)
            } else {
                onSuccess()
            }
        })
    }

    logout() {
        //should probably make a request to invalidate the authorization
        Cookies.remove('auth')
    }
}

export default Auth.get()