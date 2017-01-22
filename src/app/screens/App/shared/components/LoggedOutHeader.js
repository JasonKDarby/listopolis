import React from 'react';
import { Navbar, Nav, NavItem, Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

const LoggedOutHeader = () => (
    <Navbar>
        <Nav>
            <NavItem disabled>Personal</NavItem>
            <NavItem disabled>Open source</NavItem>
            <NavItem disabled>Business</NavItem>
            <NavItem disabled>Explore</NavItem>
            <NavItem disabled>Help</NavItem>
        </Nav>
        <Nav pullRight>
            <NavItem disabled>Pricing</NavItem>
            <NavItem disabled>Blog</NavItem>
            <NavItem disabled>Support</NavItem>
            <NavItem>
                <Navbar.Form>
                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text" placeholder="Search Listopolis"/>
                        </InputGroup>
                    </FormGroup>
                </Navbar.Form>
            </NavItem>
        </Nav>
    </Navbar>
);

export default LoggedOutHeader;