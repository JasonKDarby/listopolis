import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Footer = () => (
    <Navbar>
        <Nav pullLeft="true">
            <Navbar.Text>© 2017 Listopolis, Inc.</Navbar.Text>
            <NavItem disabled>Terms</NavItem>
            <NavItem disabled>Privacy</NavItem>
            <NavItem disabled>Security</NavItem>
            <NavItem disabled>Status</NavItem>
            <NavItem disabled>Help</NavItem>
        </Nav>
        <Nav pullRight="true">
            <NavItem disabled>Contact Listopolis</NavItem>
            <NavItem disabled>API</NavItem>
            <NavItem disabled>Training</NavItem>
            <NavItem disabled>Shop</NavItem>
            <NavItem disabled>Blog</NavItem>
            <NavItem disabled>About</NavItem>
        </Nav>
    </Navbar>
);

export default Footer;