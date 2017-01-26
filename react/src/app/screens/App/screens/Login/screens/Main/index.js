import React from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import YourLists from './components/YourLists';

//TODO:  uhh, all of it
const Main = () => (
    <div>
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
    </div>
);

export default Main;