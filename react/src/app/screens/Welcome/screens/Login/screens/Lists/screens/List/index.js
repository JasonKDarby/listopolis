import React from 'react';
import { Row, Col } from 'react-bootstrap';
import List from './components/List';
import Edit from './components/Edit';

export default ({ params: { id }, user, history }) => (
    <div>
        <Row>
            <Col xs={12} sm={8} smOffset={2}>
                <List id={id} user={user} />
            </Col>
        </Row>
        <Row>
            <Col sm={8} smOffset={2} className="text-center">
                {/*TODO: This just goes to / for now, it'll be changed to the edit list path*/}
                <Edit history={history} pushPath={'/'} />
            </Col>
        </Row>
    </div>
);