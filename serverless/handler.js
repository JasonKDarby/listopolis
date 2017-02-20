const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
};

export const lists = (event, context, callback) => {

    const result = [{ id: 'dummy-id', title: 'Test list' }];

    const response = {
        statusCode: 200,
        headers: corsHeaders,
        body: result
    };

    callback(null, response);
};

export const get = (event, context, callback) => {

    const result = {
        id: event.path.id,
        title: 'Test list',
        userId: event.cognitoPoolClaims.sub,
        items: [
            'test item 1',
            'test item 2',
            'test item 3'
        ]
    };

    const response = {
        statusCode: 200,
        headers: corsHeaders,
        body: result
    };

    callback(null, response);
};

export default {
    lists,
    get
};