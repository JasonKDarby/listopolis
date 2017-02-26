import React from 'react';
import { getListById } from '../../../../../../../../../shared/ListAPI';

export default class List extends React.Component {

    constructor() {
        super();
        this.state = {
            list: null,
            loading: true
        };
    }

    componentDidMount() {
        getListById(this.props.user.jwtToken, this.props.id, response => this.setState({
            list: response.body,
            loading: false
        }));
    }

    render() {
        if(this.state.list) {
            return (
                <div>
                    <p className="text-center">{this.state.list.title}</p>
                        {
                            this.state.list ?
                                <ol>
                                    { this.state.list.lines.map((item, index) => <li key={index}>{item}</li>) }
                                </ol>
                                : this.state.loading ? 'Loading...' : "There's nothing here."
                        }
                </div>
            );
        } else {
            return (
                <div><span>loading...</span></div>
            );
        }
    }

}