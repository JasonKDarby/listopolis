import { isValidRequestData } from './validation';
import uuid from 'uuid';

export const createList = (userId, data, client, callback) => {

    const timestamp = new Date().getTime();

    if(!isValidRequestData(data)) {
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
            userId: userId,
            lines: data.lines,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    };

    client.put(params, (error, result) => {

        if(error) {

            console.error(error);
            callback(new Error('Unable to createList listLists.'));
        } else {

            const response = {id: id}
            callback(null, response);
        }
    });
};