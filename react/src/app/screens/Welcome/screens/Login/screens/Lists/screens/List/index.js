import React from 'react';
import { Row, Col } from 'react-bootstrap';
import List from './components/List';

export default ({ params: { id }, user }) => (
    <div>
        <Row>
            <Col xs={12} sm={8} smOffset={2}>
                <List id={id} user={user} />
            </Col>
        </Row>
    </div>
);