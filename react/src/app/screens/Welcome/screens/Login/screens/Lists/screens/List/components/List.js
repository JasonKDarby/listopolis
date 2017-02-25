import React from 'react';
import { backendBaseUrl } from '../../../../../../../../../config/APICredentials';

export default class List extends React.Component {

    constructor() {
        super();
        this.state = { list: null }
    }

    componentDidMount() {
        let headers = new Headers({
            'Authorization': this.props.user.jwtToken
        });
        fetch(`${backendBaseUrl}/lists/${this.props.id}`, {
            method: 'GET',
            headers: headers,
            mode: 'cors'
        }).then((response) => response.json()).then(response => {
            this.setState({ list: response.body });
        });
    }

    render() {
        if(this.state.list) {
            return (
                <div>
                    <p className="text-center">{this.state.list.title}</p>
                    <ol>
                        {this.state.list.lines.map((item, index) => <li key={index}>{item}</li>)}
                    </ol>
                </div>
            );
        } else {
            return (
                <div><span>loading...</span></div>
            );
        }
    }

}