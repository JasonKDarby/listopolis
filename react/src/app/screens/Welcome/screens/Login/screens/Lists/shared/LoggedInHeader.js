import React from 'react';
import { Navbar, Button, ButtonGroup, ButtonToolbar, Grid, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';

export default ({ children, user, history }) => (
    <div>
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/"><Glyphicon glyph="list-alt"/> Listopolis</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Navbar.Form pullRight>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button onClick={() => { user.logout(); history.push('/') }}>Logout</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Navbar.Form>
            </Navbar.Collapse>
        </Navbar>
        <Grid>
            {React.cloneElement(children, { user: user, history: history })}
        </Grid>
    </div>
);
