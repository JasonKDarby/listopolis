import React from 'react';
import { Col, Row } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import HeaderLogo from './components/HeaderLogo';

export default () => (
    <div>
        <Row>
            <Col xs={12} className="text-center">
                <HeaderLogo/>
            </Col>
        </Row>
        <Row>
            <Col xs={12} md={6} mdOffset={3}>
                <LoginForm/>
            </Col>
        </Row>
        <Row>
            <Col xs={12} md={6} mdOffset={3} className="text-center">
                <span><strong>Note:</strong> usernames are case sensitive.</span>
            </Col>
        </Row>
    </div>
);