import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

class LoggedOutHeader extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Listopolis</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem disabled>Personal</NavItem>
                    <NavItem disabled>Open source</NavItem>
                    <NavItem disabled>Business</NavItem>
                    <NavItem disabled>Explore</NavItem>
                    <NavItem disabled>Help</NavItem>
                    <NavItem disabled>Pricing</NavItem>
                    <NavItem disabled>Blog</NavItem>
                    <NavItem disabled>Support</NavItem>
                </Nav>
                <Nav pullRight>
                    <Navbar.Form>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search Listopolis"/>
                        </FormGroup>
                        {' '}
                        <Button>Sign in</Button>
                        {' '}
                        <Button>Sign up</Button>
                    </Navbar.Form>
                </Nav>
            </Navbar>
        );
    }
}

export default LoggedOutHeader