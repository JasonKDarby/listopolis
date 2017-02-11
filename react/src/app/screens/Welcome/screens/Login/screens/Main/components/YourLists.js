import React from 'react';
import { Panel, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import './YourLists.css';

const title = (
    <ButtonToolbar>
        <ButtonGroup>
            <span>Your lists</span>
        </ButtonGroup>
        <ButtonGroup className="pull-right">
            <Button bsStyle="success" bsSize="xsmall">New list</Button>
        </ButtonGroup>
    </ButtonToolbar>
);

//TODO:  uhh, all of it
export default () => (
    <Panel header={title}>
        <ul>
            <li>first list</li>
            <li>second list</li>
            <li>fourth list</li>
            <li>fifth list</li>
            <li>second list</li>
            <li>second list</li>
            <li>second list</li>
            <li>second list</li>
        </ul>
    </Panel>
);