import uuid from 'uuid';
import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
};

const minTitleLength = 1;
const maxTitleLength = 140;
const minTotalLines = 1;
const maxTotalLines = 140;
const minLineLength = 1;
const maxLineLength = 140;

const validRequestData = requestData => {
    let valid = false;

    if(!requestData.title) {
        console.log('Title missing.');
    } else if(!(requestData.title.length >= minTitleLength)) {
        console.log('Title is not above minimum length.');
    } else if(!(requestData.title.length <= maxTitleLength)) {
        console.log('Title is not under or equal to maximum length.');
    } else if(!(requestData.lines)) {
        console.log('Lines array is missing.');
    } else if(!(requestData.lines.length >= minTotalLines)) {
        console.log('Lines array is not above minimum length.');
    } else if(!(requestData.lines.length <= maxTotalLines)) {
        console.log('Lines array is not under or equal to maximum length.');
    } else {
        requestData.lines.forEach((line, i) => {
            if(!(line.length >= minLineLength)) {
                console.log(`Line[${i}] is not above minimum length.`)
            } else if(!(line.length <= maxLineLength)) {
                console.log(`Line[${i}] is not under or equal to maximum length.`)
            } else {
                //All checks passed!
                valid = true;
            }
        });
    }
    return valid;
};


export const createList = (event, context, callback) => {

    const timestamp = new Date().getTime();
    const data = event.body;

    if(!validRequestData(data)) {
        console.log('Invalid data provided:', data);
        callback(new Error('Unable to createList list.'));
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
    };

    dynamoDB.put(params, (error, result) => {

        if(error) {

            console.error(error);
            callback(new Error('Unable to createList listLists.'));
        } else {

            const response = {
                statusCode: 201,
                headers: corsHeaders,
                body: {id: id}
            };

            callback(null, response);
        }
    });
};

export const listLists = (event, context, callback) => {

    console.log(`Scanning for lists with userId=${event.cognitoPoolClaims.sub}.`);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        FilterExpression: 'userId = :uid',
        ExpressionAttributeValues: {
            ':uid': event.cognitoPoolClaims.sub
        }
    };

    dynamoDB.scan(params, (error, result) => {
        if(error) {

            console.error(error);
            callback(new Error('Unable to fetch lists.'));
        } else {

            const lists = [];
            result.Items.forEach((item) => lists.push({id: item.id, title: item.title}));

            const response = {
                statusCode: 200,
                headers: corsHeaders,
                body: lists
            };
            callback(null, response);
        }
    });
};

export const getList = (event, context, callback) => {

    console.log(`Querying for list with id=${event.path.id} and userId=${event.cognitoPoolClaims.sub}.`);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        //We have to query on userId to prevent cross user lists.
        KeyConditionExpression: 'id = :id AND userId = :uid',
        ExpressionAttributeValues: {
            ':uid': event.cognitoPoolClaims.sub,
            ':id': event.path.id
        }
    };

    dynamoDB.query(params, (error, result) => {
        if(error) {

            console.error(error);
            callback(new Error('Unable to fetch list.'));
        } else {

            console.log('Query returned result:', result);

            let response;

            if (result.Count === 0) {
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

            if(response) callback(null, response);
            else callback(new Error('Error while processing result.'))
        }
    });
};

export const updateList = (event, context, callback) => {

    console.log(`Updating list with id=${event.path.id} and userId=${event.cognitoPoolClaims.sub}.`);

    const timestamp = new Date().getTime();
    const data = event.body;

    if(!validRequestData(data)) {
        console.log('Invalid data provided:', data);
        callback(new Error('Unable to createList listLists.'));
        return;
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            'id': event.path.id,
            'userId': event.cognitoPoolClaims.sub
        },
        UpdateExpression: 'SET title = :title, #lines = :lines, updatedAt = :updatedAt',
        ExpressionAttributeNames: {
            '#lines': 'lines'
        },
        ExpressionAttributeValues: {
            ':title': data.title,
            ':lines': data.lines,
            ':updatedAt': timestamp
        },
        ReturnValues: 'UPDATED_NEW'
    };

    dynamoDB.update(params, (error, result) => {
        if(error) {

            console.error(error);
            callback(new Error('Unable to update list'));
            return;
        }

        console.log('Update returned result:', result);

        let response = {
            statusCode: 200,
            headers: corsHeaders
        };

        callback(null, response);
    });
};

export const deleteList = (event, context, callback) => {

    console.log(`Deleting list with id=${event.path.id} and userId=${event.cognitoPoolClaims.sub}.`);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            'id': event.path.id,
            'userId': event.cognitoPoolClaims.sub
        }
    };

    dynamoDB.delete(params, (error, result) => {
        if(error) {

            console.error(error);
            callback(new Error('Unable to delete list.'));
            return;
        }

        console.log('Delete returned result:', result);

        let response;

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
    updateList,
    deleteList
};