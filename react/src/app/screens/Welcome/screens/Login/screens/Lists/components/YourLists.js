import React from 'react';
import { Panel, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import './YourLists.css';

const Title = (
    <ButtonToolbar>
        <ButtonGroup>
            <span>Your lists</span>
        </ButtonGroup>
        <ButtonGroup className="pull-right">
            <LinkContainer to="/createNewList">
                <Button bsStyle="success" bsSize="xsmall">New list</Button>
            </LinkContainer>
        </ButtonGroup>
    </ButtonToolbar>
);

//TODO:  uhh, all of it
export default class YourLists extends React.Component {

    constructor() {
        super();
        this.state = { lists: [] };
    }

    componentDidMount() {
        let headers = new Headers({
            'Authorization': this.props.user.jwtToken
        });
        fetch('https://vaqyz9vz60.execute-api.us-east-1.amazonaws.com/dev/lists', {
            method: 'GET',
            headers: headers,
            mode: 'cors'
        }).then((response) => response.json()).then(response => {
            this.setState({ lists: response.body });
        });
    }

    render() {
        return (
            <Panel header={Title}>
                {
                    this.state.lists && this.state.lists.length > 0 ?
                        <ul>
                            {
                                this.state.lists.map(
                                    list =>
                                        <li key={list.id}>
                                            <Link to={`/lists/${list.id}`}>
                                                <span>{list.title}</span>
                                            </Link>
                                        </li>
                                )
                            }
                        </ul>
                        : "There's nothing here."
                }
            </Panel>
        );
    }

}