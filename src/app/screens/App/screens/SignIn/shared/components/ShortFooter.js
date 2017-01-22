import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const ShortFooter = () => (
    <Navbar>
        <Nav>
            <NavItem disabled>Terms</NavItem>
            <NavItem disabled>Privacy</NavItem>
            <NavItem disabled>Security</NavItem>
            <NavItem disabled>Contact Listopolis</NavItem>
        </Nav>
    </Navbar>
);

export default ShortFooter;
