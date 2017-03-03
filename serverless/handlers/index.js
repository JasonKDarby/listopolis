import AWS from 'aws-sdk';
import { createList } from '../lists/create';
import { listLists } from '../lists/list';
import { getList } from '../lists/get';
import { updateList } from '../lists/update';
import { deleteList } from '../lists/delete';
import { corsHeaders } from './defaultHeaders';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const create = (event, context, callback) => {
    createList(event.cognitoPoolClaims.sub, event.body, dynamoDB, (error, result) => {
        if(error) callback(error);
        else {
            const response = {
                statusCode: 201,
                headers: corsHeaders,
                body: result
            };
            callback(null, response);
        }
    });
};

export const list = (event, context, callback) => {
    listLists(event.cognitoPoolClaims.sub, dynamoDB, (error, result) => {
        if(error) callback(error);
        else {
            const response = {
                statusCode: 200,
                headers: corsHeaders,
                body: result
            };
            callback(null, response);
        }
    });
};

export const get = (event, context, callback) => {
    getList(event.cognitoPoolClaims.sub, event.path.id, dynamoDB, (error, result) => {
        if(error) callback(error);
        else if(result) {
            const response = {
                statusCode: 200,
                headers: corsHeaders,
                body: result
            };
            callback(null, response);
        } else {
            const response = {
                statusCode: 404,
                headers: corsHeaders
            };
            callback(null, response);
        }
    });
};

export const update = (event, context, callback) => {
    updateList(event.cognitoPoolClaims.sub, event.path.id, event.body, dynamoDB, (error) => {
        if(error) callback(error);
        else {
            const response = {
                statusCode: 200,
                headers: corsHeaders
            };
            callback(null, response);
        }
    });
};

//'delete' is a js keyword so we can't use it alone.
export const deleteHandler = (event, context, callback) => {
    deleteList(event.cognitoPoolClaims.sub, event.path.id, dynamoDB, (error) => {
        if(error) callback(error);
        else {
            const response = {
                statusCode: 200,
                headers: corsHeaders
            };
            callback(null, response);
        }
    });
};

export default {
    create,
    list,
    get,
    update,
    deleteHandler
};