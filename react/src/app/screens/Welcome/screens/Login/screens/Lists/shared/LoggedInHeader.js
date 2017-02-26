import React from 'react';
import { Navbar, Button, ButtonGroup, ButtonToolbar, Grid } from 'react-bootstrap';

export default ({ children, user, history }) => (
    <div>
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/"><span className="glyphicon glyphicon-list-alt"/> Listopolis</a>
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
            {React.cloneElement(children, { user: user })}
        </Grid>
    </div>
);
