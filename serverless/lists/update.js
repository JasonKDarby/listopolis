import { isValidRequestData } from './validation';

export const updateList = (userId, id, data, client, callback) => {

    console.log(`Updating list with id=${id} and userId=${userId}.`);

    const timestamp = new Date().getTime();

    if(!isValidRequestData(data)) {
        console.log('Invalid data provided:', data);
        callback(new Error('Unable to createList listLists.'));
        return;
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            'id': id,
            'userId': userId
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

    client.update(params, (error, result) => {
        if(error) {

            console.error(error);
            callback(new Error('Unable to update list'));
        } else {

            console.log('Update returned result:', result);

            callback(null, null);
        }
    });
};