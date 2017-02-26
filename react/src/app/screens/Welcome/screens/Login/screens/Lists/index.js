import React from 'react';
import { Row, Col } from 'react-bootstrap';
import YourLists from './components/YourLists';

export default ({user}) => (
    <div>
        <Row>
            <Col sm={8} smOffset={2}>
                <YourLists user={user}/>
            </Col>
        </Row>
    </div>
);