import React from 'react';
import { Grid } from 'react-bootstrap';

const Body = (props, fluid) => (
    <Grid fluid={fluid}>
        {props.children}
    </Grid>
);

export default Body;