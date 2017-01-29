import React from 'react';
import { Navbar, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

const LoggedInHeader = (props) => (
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
                            <Button>Logout</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Navbar.Form>
            </Navbar.Collapse>
        </Navbar>
        {props.children}
    </div>
)

export default LoggedInHeader
