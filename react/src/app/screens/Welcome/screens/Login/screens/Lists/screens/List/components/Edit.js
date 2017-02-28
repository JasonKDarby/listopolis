import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default ({ history, pushPath }) => (
    <Button bsStyle="primary" bsSize="small" onClick={ () => history.push(pushPath) }>
        <Glyphicon glyph="edit"/>
        {' '}
        Edit
    </Button>
);
