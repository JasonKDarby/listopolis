import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonGroup, Glyphicon, Col, Row, Alert } from 'react-bootstrap';
import autosize from 'autosize';
import { observer } from 'mobx-react';
import './ListForm.css';

export default observer(({ form }) =>
    <Form onSubmit={form.onSubmit} horizontal>
        <Row>
            <Col xs={12} className="text-center">
                <p><strong>{form.error}</strong></p>
            </Col>
        </Row>
        <Row>
            <Col sm={8} smOffset={2} className="text-center">
                {
                    form.errorMessages.map(
                        (errorMessage, index) =>
                            <Alert bsStyle="warning" key={index}>{errorMessage}</Alert>)
                }
            </Col>
        </Row>
        <Row>
            <Col sm={8} smOffset={2}>
                <FormGroup validationState={form.$('title').isValid ? 'success' : 'error'}>
                    <ControlLabel>{form.$('title').label}</ControlLabel>
                    <FormControl {...form.$('title').bind()} />
                    <FormControl.Feedback />
                </FormGroup>
            </Col>
        </Row>
        <br/>
        { form.$('lines').map(
            (line, index) =>
                <Row key={line.key}>
                    <Col sm={10} smOffset={1}>
                        <FormGroup validationState={
                            line.isValid && line.value.length > 0 ? 'success' : 'error'
                        }>
                            <Row>
                                <Col xs={2} sm={1}>
                                    <ButtonGroup vertical>
                                        {
                                            index > 0 &&
                                            <Button type="button" onClick={() => {
                                                let lines = [];
                                                form.$('lines').fields
                                                    .forEach(field => lines.push(field.value));
                                                let line = lines.splice(index-1, 1);
                                                lines.splice(index, 0, line);
                                                let flattened = [];
                                                for(let i = 0; i < lines.length; ++i) {
                                                    flattened = flattened.concat(lines[i]);
                                                }
                                                form.set({
                                                    lines: flattened
                                                });
                                            }}>
                                                <Glyphicon glyph="arrow-up"/>
                                            </Button>
                                        }
                                        {
                                            index !== form.$('lines').fields.size-1 &&
                                            <Button type="button" onClick={() => {
                                                let lines = [];
                                                form.$('lines').fields
                                                    .forEach(field => lines.push(field.value));
                                                let line = lines.splice(index+1, 1);
                                                lines.splice(index, 0, line);
                                                let flattened = [];
                                                for(let i = 0; i < lines.length; ++i) {
                                                    flattened = flattened.concat(lines[i]);
                                                }
                                                form.set({
                                                    lines: flattened
                                                });
                                            }}>
                                                <Glyphicon glyph="arrow-down"/>
                                            </Button>
                                        }
                                    </ButtonGroup>
                                </Col>
                                <Col xs={8} sm={10}>
                                    <FormControl
                                        componentClass="textarea"
                                        {...line.bind()}
                                        inputRef={autosize}
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock>{index}</HelpBlock>
                                </Col>
                                <Col xs={2} sm={1}>
                                    <ButtonGroup vertical>
                                        <Button type="button" onClick={line.onClear}>
                                            <Glyphicon glyph="erase" />
                                        </Button>
                                        {
                                            /*if there's only one field we don't want to be able to delete it*/
                                            form.$('lines').fields.size !== 1 &&
                                            <Button type="button" onClick={line.onDel}>
                                                <Glyphicon glyph="remove" />
                                            </Button>
                                        }
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs={10} xsOffset={1} className="text-center">
                                    <Button type="button" bsSize="xsmall" onClick={() => {
                                        let lines = [];
                                        form.$('lines').fields
                                            .forEach(field => lines.push(field.value));
                                        lines.splice(index+1, 0, '');
                                        form.update({
                                            lines: lines
                                        });
                                    }}>
                                        <Glyphicon glyph="plus" />
                                    </Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                </Row>
        )}
        <br/>
        <Row>
            <Col smOffset={1} sm={10}>
                <FormGroup className="text-center">
                    <Button
                        type="submit"
                        bsSize="large"
                        bsStyle="success"
                        onClick={form.onSubmit}
                    >
                        Create new list
                    </Button>
                </FormGroup>
            </Col>
        </Row>
    </Form>
);