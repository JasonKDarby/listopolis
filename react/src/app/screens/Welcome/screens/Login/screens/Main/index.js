import React from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import YourLists from './components/YourLists';

export default () => (
    <Grid>
        <Row>
            <Col xs={12}>
                <p>TEMPORARY MAIN PAGE</p>
            </Col>
        </Row>
        <Row>
            <Col sm={4} smOffset={4}>
                <YourLists/>
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                <LinkContainer to="/list">
                    <Button>Continue</Button>
                </LinkContainer>
            </Col>
        </Row>
    </Grid>
);