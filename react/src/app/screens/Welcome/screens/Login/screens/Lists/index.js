import React from 'react';
import { Row, Col } from 'react-bootstrap';
import YourLists from './components/YourLists';

export default ({user}) => (
    <div>
        <Row>
            <Col sm={4} smOffset={4}>
                <YourLists user={user}/>
            </Col>
        </Row>
    </div>
);