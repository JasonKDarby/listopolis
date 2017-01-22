import React from 'react';
import { Row, Col, Well, Button } from 'react-bootstrap';

const SignUp = () => (
    <Well>
        <Row>
            <Col xs={4}>
                <Button>Sign up for Listopolis</Button>
            </Col>
            <Col xs={8}>
                Public lists are free for now.  Work together across unlimited private lists for
                ${Number.MAX_SAFE_INTEGER} / month.
            </Col>
        </Row>
    </Well>
);

export default SignUp;