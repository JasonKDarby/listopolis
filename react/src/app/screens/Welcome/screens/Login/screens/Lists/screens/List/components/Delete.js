import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default ({ onClick }) => (
    <Button bsStyle="danger" bsSize="small" onClick={onClick}>
        <Glyphicon glyph="trash"/>
        {' '}
        Delete
    </Button>
);
