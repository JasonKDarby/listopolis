import uuid from 'uuid';
import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
};

export const createList = (event, context, callback) => {

    const timestamp = new Date().getTime();
    const data = event.body;

    if(!data.title || !data.lines || data.lines.length < 1) {
        console.log('Invalid data provided');
        console.log(data);
        callback(new Error('Unable to createList listLists.'));
        return;
    }

    const id = uuid.v1();

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: id,
            title: data.title,
            userId: event.cognitoPoolClaims.sub,
            lines: data.lines,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    }

    dynamoDB.put(params, (error, result) => {
        console.log('result of db put');
        console.log(result);

        if(error) {
            console.error(error);
            callback(new Error('Unable to createList listLists.'));
            return;
        }

        const response = {
            statusCode: 201,
            headers: corsHeaders,
            body: { id: id }
        }

        callback(null, response);
    });
};

export const listLists = (event, context, callback) => {

    console.log(`scanning for lists with username=${event.cognitoPoolClaims.sub}`);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        FilterExpression: 'userId = :uid',
        ExpressionAttributeValues: {
            ':uid': event.cognitoPoolClaims.sub
        }
    }

    dynamoDB.scan(params, (error, result) => {
        if(error) {
            console.error(error);
            callback(new Error('Unable to fetch lists.'));
            return;
        }

        const lists = [];
        result.Items.forEach((item) => lists.push({id: item.id, title: item.title}));

        const response = {
            statusCode: 200,
            headers: corsHeaders,
            body: lists
        };
        callback(null, response);
    });
};

export const getList = (event, context, callback) => {


    console.log(`querying for list with id=${event.path.id} and username=${event.cognitoPoolClaims.sub}`);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        //We have to query on userId to prevent cross user lists.
        KeyConditionExpression: 'id = :id AND userId = :uid',
        ExpressionAttributeValues: {
            ':uid': event.cognitoPoolClaims.sub,
            ':id': event.path.id
        }
    }

    dynamoDB.query(params, (error, result) => {
        if(error) {
            console.error(error);
            callback(new Error('Unable to fetch listLists.'));
            return;
        }

        console.log('query returned result');
        console.log(result);

        let response = {
            statusCode: 500,
            headers: corsHeaders
        };

        if(result.Count === 0) {
            response = {
                statusCode: 404,
                headers: corsHeaders
            }
        } else {
            const item = result.Items[0];
            const list = {
                id: item.id,
                title: item.title,
                lines: item.lines
            };
            response = {
                statusCode: 200,
                headers: corsHeaders,
                body: list
            };
        }
        callback(null, response);
    });
};

export const deleteList = (event, context, callback) => {

    console.log(`deleting list with id=${event.path.id} and userId=${event.cognitoPoolClaims.sub}`);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            'id': event.path.id,
            'userId': event.cognitoPoolClaims.sub
        }/*,
        ConditionExpression: 'userId = :uid',
        ExpressionAttributeValues: {
            ':uid': event.cognitoPoolClaims.sub
        }*/
    }

    dynamoDB.delete(params, (error, result) => {
        if(error) {
            console.error(error);
            callback(new Error('unable to delete list'));
            return;
        }

        console.log('delete returned result');
        console.log(result);

        let response = {
            statusCode: 500,
            headers: corsHeaders
        };

        if(result.Count === 0) {
            response = {
                statusCode: 404,
                headers: corsHeaders
            };
        } else {
            response = {
                statusCode: 200,
                headers: corsHeaders
            };
        }
        callback(null, response);
    });
};

export default {
    createList,
    listLists,
    getList,
    deleteList
};