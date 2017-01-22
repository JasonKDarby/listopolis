import React from 'react';
import { Grid, Navbar, Nav, NavItem, Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const LoggedOutHeader = () => (
    <Navbar>
        <Nav>
            <NavItem>Personal</NavItem>
            <NavItem>Open Source</NavItem>
            <NavItem>Business</NavItem>
            <NavItem>Explore</NavItem>
            <NavItem>Personal</NavItem>
        </Nav>
        <Navbar.Form pullRight>
            <FormGroup>
                <LinkContainer to="/login">
                    <Button>Sign In</Button>
                </LinkContainer>
                {' '}
                <Button bsStyle="success">Sign Up</Button>
            </FormGroup>
        </Navbar.Form>
        <Navbar.Form pullRight>
            <FormGroup>
                <FormControl type="text" placeholder="Search Listopolis" />
            </FormGroup>
        </Navbar.Form>
        <Nav pullRight>
            <NavItem>Pricing</NavItem>
            <NavItem>Blog</NavItem>
            <NavItem>Support</NavItem>
        </Nav>
    </Navbar>
);

export default LoggedOutHeader;