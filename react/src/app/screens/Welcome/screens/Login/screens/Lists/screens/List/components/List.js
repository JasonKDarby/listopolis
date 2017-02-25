import React from 'react';
import { getLists } from '../../../../../../../../../shared/ListAPI';

export default class List extends React.Component {

    constructor() {
        super();
        this.state = { list: null }
    }

    componentDidMount() {
        getLists(this.props.user.jwtToken, response => this.setState({ list: response.body }));
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