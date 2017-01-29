import React from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import List from './components/List'

//TODO:  uhh, all of it
const Main = () => (
    <div>
        <Grid>
            <Row>
                <Col xs={12} className="text-center">
                    <p>TEMPORARY LIST PAGE</p>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={8} smOffset={2}>
                    <List/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <LinkContainer to="/main">
                        <Button>Continue</Button>
                    </LinkContainer>
                </Col>
            </Row>
        </Grid>
    </div>
);

export default Main;