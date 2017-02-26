import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import List from './components/List';

//TODO:  uhh, all of it
export default ({ params: { id }, user }) => (
    <div>
        <Row>
            <Col xs={12} className="text-center">
                <p>TEMPORARY LIST PAGE</p>
            </Col>
        </Row>
        <Row>
            <Col xs={12} sm={8} smOffset={2}>
                <List id={id} user={user} />
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                <LinkContainer to="/lists">
                    <Button>Continue</Button>
                </LinkContainer>
            </Col>
        </Row>
    </div>
);