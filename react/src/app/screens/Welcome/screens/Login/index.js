import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import HeaderLogo from './components/HeaderLogo';

export default () => (
    <div>
        <Grid>
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
        </Grid>
    </div>
);