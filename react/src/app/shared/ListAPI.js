import { backendBaseUrl } from '../config/APICredentials';

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