import React from 'react';
import { Row, Col, Jumbotron } from 'react-bootstrap';

const Who = () => (
    <Jumbotron>
        <Row>
            <h2>Who uses Listopolis?</h2>
        </Row>
        <Row>
            <Col xs={4}>
                <h3>Individuals</h3>
                <p>
                    Use Listopolis to create personal lists, whether you want to experiment with a new buzzfeed
                    50 page slideshow or keep track of guests to your dinner party.
                </p>
            </Col>
            <Col xs={4}>
                <h3>Communities</h3>
                <p>
                    Listopolis hosts one of the smallest collections of lists. Create, manage, and work on some of
                    today's least influential itemizations.
                </p>
            </Col>
            <Col xs={4}>
                <h3>Businesses</h3>
                <p>
                    Businesses of all sizes use Listopolis to.. pfft no they don't.
                </p>
            </Col>
        </Row>
    </Jumbotron>
);

export default Who;
