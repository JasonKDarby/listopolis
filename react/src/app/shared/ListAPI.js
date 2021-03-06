import { backendBaseUrl } from '../config/APICredentials';
import { hashHistory } from 'react-router';

//TODO: handle more errors.
const filterErrors = (response, successCallback) => {
    if(response.statusCode === 401) {
        hashHistory.push('/');
    } else {
        successCallback(response);
    }
};

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
        filterErrors(response, callback);
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
        filterErrors(response, callback);
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
        filterErrors(response, callback);
    });
};

export const updateList = (authToken, id, updateRequestData, callback) => {

    let headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authToken
    });

    fetch(`${backendBaseUrl}/lists/${id}`, {
        method: 'PUT',
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(updateRequestData)
    }).then((response) => response.json()).then(response => {
        filterErrors(response, callback);
    });
};

export const deleteList = (authToken, id, callback) => {

    let headers = new Headers({
        'Authorization': authToken
    });

    fetch(`${backendBaseUrl}/lists/${id}`, {
        method: 'DELETE',
        headers: headers,
        mode: 'cors'
    }).then((response) => response.json()).then(response => {
        filterErrors(response, callback);
    });
};