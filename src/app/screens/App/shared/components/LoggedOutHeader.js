import React from 'react';
import { Navbar, Nav, NavItem, Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

const LoggedOutHeader = () => (
    <Navbar>
<<<<<<< HEAD
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Listopolis</a>
            </Navbar.Brand>
        </Navbar.Header>
=======
>>>>>>> 1addcee673fd203fd3b60f3deeb827cd31c9f4d6
        <Nav>
            <NavItem disabled>Personal</NavItem>
            <NavItem disabled>Open source</NavItem>
            <NavItem disabled>Business</NavItem>
            <NavItem disabled>Explore</NavItem>
            <NavItem disabled>Help</NavItem>
<<<<<<< HEAD
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
=======
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
            <NavItem>
>>>>>>> 1addcee673fd203fd3b60f3deeb827cd31c9f4d6
                <Button>Sign in</Button>
                {' '}
                <Button>Sign up</Button>
            </Navbar.Form>
        </Nav>
    </Navbar>
);

export default LoggedOutHeader;