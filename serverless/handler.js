import { helloSvc } from './services/helloSvc'

export const helloLambda = (event, context, callback) => {

    const result = helloSvc({name: 'Serverless'})

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: result,
            input: event,
        }),
    }

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });

    callback(null, response)
}

export const lists = (event, context, callback) => {

    console.log('event');
    console.log(event);

    console.log('userId');
    console.log(context.identity);

    const result = [{ id: 'dummy-id', title: 'Test list' }];

    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: {
            lists: result
        }
    };

    callback(null, response);
}

export default {
    helloLambda,
    lists
}