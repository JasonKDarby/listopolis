import { backendBaseUrl } from '../config/APICredentials';

export const createList = (authToken, createRequestData, callback) => {

    let headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authToken
    });

    fetch(`${backendBaseUrl}/lists`, {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(createRequestData)
    }).then((response) => response.json()).then(response => {
        callback(response);
    });
};

export const getLists = (authToken, callback) => {

    let headers = new Headers({
        'Authorization': authToken
    });

    fetch(`${backendBaseUrl}/lists`, {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    }).then((response) => response.json()).then(response => {
        callback(response);
    });
};

export const getListById = (authToken, id, callback) => {

    let headers = new Headers({
        'Authorization': authToken
    });

    fetch(`${backendBaseUrl}/lists/${id}`, {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    }).then((response) => response.json()).then(response => {
        callback(response);
    });
};