import React from 'react';
import { Navbar, Button, Grid, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

//TODO: Fix for larger-than-mobile, buttons are obnoxiously large.
const Header = () => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Navbar.Form className="text-right">
                <Grid fluid>
                    <Row>
                        <Col xs={6}>
                            <LinkContainer to="/signup">
                                <Button bsStyle="success" block>Sign up</Button>
                            </LinkContainer>
                        </Col>
                        <Col xs={6}>
                            <LinkContainer to="/login">
                                <Button block>Sign in</Button>
                            </LinkContainer>
                        </Col>
                    </Row>
                </Grid>
            </Navbar.Form>
        </Navbar.Collapse>
    </Navbar>
);

export default Header;
