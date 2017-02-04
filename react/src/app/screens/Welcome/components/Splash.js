import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './blinking-cursor.css';

const Splash = () => (
    <Jumbotron className="text-center">
        <h1>1. <span className="blinking-cursor">|</span></h1>
        <p>Create, keep, and share lists.</p>
        <LinkContainer to="/login">
            <Button bsStyle="success">Log in to Listopolis</Button>
        </LinkContainer>
        <h5>(using a Google account)</h5>
    </Jumbotron>
);

export default Splash;