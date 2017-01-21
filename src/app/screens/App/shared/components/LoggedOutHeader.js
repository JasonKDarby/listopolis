import React from 'react';
import { Navbar, Nav, NavItem, Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

const LoggedOutHeader = () => (
    <Navbar>
        <Nav pullLeft="true">
            <NavItem disabled>Personal</NavItem>
            <NavItem disabled>Open source</NavItem>
            <NavItem disabled>Business</NavItem>
            <NavItem disabled>Explore</NavItem>
            <NavItem disabled>Help</NavItem>
        </Nav>
        <Nav pullRight="true">
            <NavItem disabled>Pricing</NavItem>
            <NavItem disabled>Blog</NavItem>
            <NavItem disabled>Support</NavItem>
            <NavItem>
                <form>
                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text" placeholder="Search Listopolis"/>
                        </InputGroup>
                    </FormGroup>
                </form>
            </NavItem>
            <NavItem>
                <Button>Sign in</Button>
            </NavItem>
            <NavItem>
                <Button>Sign up</Button>
            </NavItem>
        </Nav>
    </Navbar>
);

export default LoggedOutHeader