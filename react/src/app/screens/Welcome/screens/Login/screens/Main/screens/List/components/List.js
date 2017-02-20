import React from 'react';

export default class List extends React.Component {

    constructor() {
        super();
        this.state = { list: null }
    }

    componentDidMount() {
        let headers = new Headers({
            'Authorization': this.props.user.jwtToken
        });
        fetch(`https://wne2ppk41m.execute-api.us-east-1.amazonaws.com/dev/lists/${this.props.id}`, {
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
                        {this.state.list.items.map((item, index) => <li key={index}>{item}</li>)}
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