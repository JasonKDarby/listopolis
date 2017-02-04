//http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
import singleton from 'singleton'
import AWS from 'aws-sdk'
import APICredentials from './APICredentials'

AWS.config.region = 'us-east-1'

const credKeys = [
    'accessKeyId',
    'secretAccessKey',
    'sessionToken'
]

const cognitoIdentityOptions = { IdentityPoolId: APICredentials.awsCognitoIdentityPoolId }

class Auth extends singleton {

    get isLoggedIn() {
        if(AWS.config.credentials) {
            console.log('credentials exist')
            console.log(AWS.config.credentials)
            if(AWS.config.credentials.expired) {
                console.log('credentials are expired')
                return false
            } else {
                console.log('credentials are good')
                AWS.config.getCredentials((error) => {
                    if(error) console.log(error)
                })
                console.log(`AWS.CognitoIdentity.describeIdentity: ${AWS.CognitoIdentity.describeIdentity}`)
                console.log(AWS.config.credentials)
                return true
            }
        } else {
            console.log('no credentials found')
            console.log('looking in session')
            console.log('session values:')
            let sessionValues =
                credKeys.map((key) => sessionStorage[key]).filter((value) => value !==  null && value !== undefined)
            console.log(sessionValues)
            if(sessionValues.length === 3) {
                console.log('found credentials in session')
                AWS.config.credentials = new AWS.Credentials(...sessionValues)
                //credKeys.forEach((key) => AWS.config.credentials[key] = sessionStorage.getItem(key))
                //how do we validate the credentials
                if(AWS.config.credentials.needsRefresh()) {
                    console.log('credentials need refresh')
                    AWS.config.credentials.refresh()
                } else {
                    console.log('credentials do not need refresh')
                }
                return true
            } else {
                console.log('no valid credentials in session')
                return false
            }
        }
    }

    login(token, onSuccess, onFailure) {
        //send off to auth service, service should set a cookie
        AWS.config.credentials = new AWS.CognitoIdentityCredentials(
            Object.assign({}, cognitoIdentityOptions, { Logins: { 'accounts.google.com': token }})
        )
        AWS.config.credentials.get((error) => {
            if(error) {
                onFailure(error)
            } else {
                credKeys.forEach((key) => sessionStorage.setItem(key, AWS.config.credentials[key]))
                onSuccess()
            }
        })
    }

    logout() {
        //should probably make a request to invalidate the authorization
        let credentials = new AWS.CognitoIdentityCredentials(cognitoIdentityOptions)
        credentials.clearCachedId()
        let clearedCredentials = new AWS.CognitoIdentityCredentials(cognitoIdentityOptions)
        AWS.config.credentials = clearedCredentials
    }
}

export default Auth.get()