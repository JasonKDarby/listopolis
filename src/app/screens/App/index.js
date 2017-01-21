import React from 'react';
import { Grid, Row, Col, Jumbotron, Well, Button } from 'react-bootstrap';
import LoggedOutHeader from './shared/components/LoggedOutHeader';
import Footer from './shared/components/Footer';

const splash = (
    <Jumbotron>
        <h1>How people manage lists</h1>
        <p>Nobody uses Listopolis (yet) to keep lists of all types, sizes, or ethnicities.</p>
    </Jumbotron>
);

const welcome = (
    <Jumbotron>
        <h2>Welcome home, listizens</h2>
        <p>
            Listopolis fosters a fast, flexible, and collaborative environment for creating and managing lists that
            lets you work on your own or with others.
        </p>
    </Jumbotron>
);

const who = (
    <Jumbotron>
        <Row>
            <Col xs={6} md={4} >
                <h2>Who uses Listopolis?</h2>
            </Col>
        </Row>
        <Row>
            <Col xs={6} md={4}>
                <h3>Individuals</h3>
                <p>
                    Use Listopolis to create personal lists, whether you want to experiment with a new buzzfeed
                    50 page slideshow or keep track of guests to your dinner party.
                </p>
            </Col>
            <Col xs={6} md={4}>
                <h3>Communities</h3>
                <p>
                    Listopolis hosts one of the smallest collections of lists. Create, manage, and work on some of
                    today's least influential itemizations.
                </p>
            </Col>
            <Col xs={6} md={4}>
                <h3>Businesses</h3>
                <p>
                    Businesses of all sizes use Listopolis to.. pfft no they don't.
                </p>
            </Col>
        </Row>
    </Jumbotron>
);

const signup = (
        <Well>
            <Row>
                <Col xs={6} md={4}>
                    <Button>Sign up for Listopolis</Button>
                </Col>
                <Col xs={12} md={8}>
                    Public lists are free for now.  Work together across unlimited private lists for
                    ${Number.MAX_SAFE_INTEGER} / month.
                </Col>
            </Row>
        </Well>
);

const App = () => (
    <div>
        <LoggedOutHeader/>
        <Grid fluid>
        {splash}
        {welcome}
        {who}
        {signup}
        <Footer/>
        </Grid>
    </div>
);

export default App;
