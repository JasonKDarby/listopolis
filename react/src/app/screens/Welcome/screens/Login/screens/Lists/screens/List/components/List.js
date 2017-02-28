import React from 'react';
import { getListById } from '../../../../../../../../../shared/ListAPI';
import './List.css';
import LoadingWithBlinkingDots from '../../../shared/LoadingWithBlinkingDots';

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
        return (
            <div>
                { this.state.list && <h1 className="text-center">{this.state.list.title}</h1> }
                {
                    this.state.list ?
                        <ol>
                            { this.state.list.lines.map((item, index) => <li key={index} className="line">{item}</li>) }
                        </ol>
                        : this.state.loading ?
                            <LoadingWithBlinkingDots/>
                            : <span>There's nothing here.</span>
                }
            </div>
        );
    }

}