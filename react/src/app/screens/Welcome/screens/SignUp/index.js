import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SignUpWithGoogle from './components/SignUpWithGoogle'
import { hashHistory } from 'react-router'
import Auth from '../../../../Auth'
import LoggedOutHeader from '../../shared/LoggedOutHeader'
import AWS from 'aws-sdk'
import APICredentials from '../../../../APICredentials'

const googleSuccess = (response) => {
    console.log(response)
    console.log("authentication was successful")
    //TODO: I need to call to my backend signup and receive a client ID (along with whatever info)
    Auth.login(response.tokenId,
        () => {
            console.log(`AWS.config.credentials.identityId: ${AWS.config.credentials.identityId}`)
            console.log(`AWS.CognitoIdentity.describeIdentity: ${AWS.CognitoIdentity.describeIdentity}`)
            let creds = AWS.config.credentials
            console.log(`AWS.config.credentials: ${creds.accessKeyId} ${creds.secretAccessKey} ${creds.sessionToken}`)
            console.log(`AWS.CognitoIdentity.getId: ${AWS.CognitoIdentity.getId}`)

            AWS.config.credentials.get((error) => {
                if(error) {
                    console.log(`error: ${error}`)
                    return
                }
                let cognitoSyncClient = new AWS.CognitoSync()
                cognitoSyncClient.listDatasets({
                    IdentityId: AWS.config.credentials.identityId,
                    IdentityPoolId: APICredentials.awsCognitoIdentityPoolId
                }, (error, data) => {
                    if(error) console.log(`listDatasets error: ${error}`)
                    else {
                        console.log(data)
                        cognitoSyncClient.listRecords({
                            DatasetName: data.Datasets[0].DatasetName,
                            IdentityId: data.Datasets[0].IdentityId,
                            IdentityPoolId: APICredentials.awsCognitoIdentityPoolId
                        }, (error, data) => {
                            if(error) console.log(`listRecords error: ${error}`)
                            else {
                                console.log(`listRecords entries: ${JSON.stringify(data)}`)
                                data.Records.forEach((item, index) => {
                                    console.log(`key: ${item.Key}, value: ${item.Value}`)
                                })
                            }
                        })
                    }
                })
            })
        },
        (error) => { console.log(`error: ${error}`) }
    )
    hashHistory.push('/main')
};


const googleFailure = (response) => {
    console.log(response)

    console.log("authentication failed")
    Auth.logout()
};

//TODO:  uhh, all of it
const SignUp = (props) => (
    <div>
        <LoggedOutHeader/>
        <p>TEMPORARY SIGN UP PAGE</p>
        <SignUpWithGoogle
            onGoogleSignUpSuccess={googleSuccess}
            onGoogleSignUpFailure={googleFailure}
        />
        <LinkContainer to="/">
            <Button>Continue</Button>
        </LinkContainer>
    </div>
);

export default SignUp;