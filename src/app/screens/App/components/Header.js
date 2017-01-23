import React from 'react';
import { Navbar, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/"><span className="glyphicon glyphicon-list-alt"/> Listopolis</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Navbar.Form className="hidden-xs" pullRight>
                <ButtonToolbar>
                    <ButtonGroup>
                        <LinkContainer to="/signup">
                            <Button bsStyle="success">Sign up</Button>
                        </LinkContainer>
                    </ButtonGroup>
                    <ButtonGroup>
                        <LinkContainer to="/login">
                            <Button>Sign in</Button>
                        </LinkContainer>
                    </ButtonGroup>
                </ButtonToolbar>
            </Navbar.Form>
            <Navbar.Form className="visible-xs">
                <ButtonGroup justified>
                    <LinkContainer to="/signup">
                        <Button bsStyle="success" bsSize="large">Sign up</Button>
                    </LinkContainer>
                    <LinkContainer to="/login">
                        <Button bsSize="large">Sign in</Button>
                    </LinkContainer>
                </ButtonGroup>
            </Navbar.Form>
        </Navbar.Collapse>
    </Navbar>
);

export default Header;
