import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import YourLists from './components/YourLists';

export default ({user}) => (
    <Grid>
        <Row>
            <Col xs={12}>
                <p>TEMPORARY LISTS PAGE</p>
            </Col>
        </Row>
        <Row>
            <Col sm={4} smOffset={4}>
                <YourLists user={user}/>
            </Col>
        </Row>
    </Grid>
);