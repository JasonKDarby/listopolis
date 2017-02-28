import React from 'react';
import { Panel, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import './YourLists.css';
import { getLists } from '../../../../../../../shared/ListAPI';
import LoadingWithBlinkingDots from '../shared/LoadingWithBlinkingDots';

const Title = (
    <ButtonToolbar>
        <ButtonGroup>
            <span>Your lists</span>
        </ButtonGroup>
        <ButtonGroup className="pull-right">
            <LinkContainer to="/createNewList">
                <Button bsStyle="success" bsSize="small">New list</Button>
            </LinkContainer>
        </ButtonGroup>
    </ButtonToolbar>
);

//TODO:  uhh, all of it
export default class YourLists extends React.Component {

    constructor() {
        super();
        this.state = {
            lists: [],
            loading: true,
        };
    }

    componentDidMount() {
        getLists(this.props.user.jwtToken, response => {
            this.setState({
                lists: response.body,
                loading: false
            });
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
                                                <h4>{list.title}</h4>
                                            </Link>
                                        </li>
                                )
                            }
                        </ul>
                        : this.state.loading ?
                            <LoadingWithBlinkingDots/>
                            : <span>There's nothing here.</span>
                }
            </Panel>
        );
    }

}