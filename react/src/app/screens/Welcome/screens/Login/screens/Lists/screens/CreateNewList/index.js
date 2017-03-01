import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonGroup, Glyphicon, Col, Row, Alert } from 'react-bootstrap'
import { observer } from 'mobx-react';
import { hashHistory } from 'react-router'
import './index.css';
import autosize from 'autosize';
import { createList } from '../../../../../../../../shared/ListAPI';
import { createEmptyListForm } from './shared/ListForm';

export default observer(class extends React.Component {

    componentWillMount() {
        this.createNewListForm = createEmptyListForm((requestData) => {
            createList(this.props.user.jwtToken, requestData, response => {
                hashHistory.push(`/lists/${response.body.id}`);
            });
        });
        this.createNewListForm.reset();
    }

    render() {
        return (
            <Form onSubmit={this.createNewListForm.onSubmit} horizontal>
                <Row>
                    <Col xs={12} className="text-center">
                        <p><strong>{this.createNewListForm.error}</strong></p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8} smOffset={2} className="text-center">
                        {
                            this.createNewListForm.errorMessages.map(
                                (errorMessage, index) =>
                                    <Alert bsStyle="warning" key={index}>{errorMessage}</Alert>)
                        }
                    </Col>
                </Row>
                <Row>
                    <Col sm={8} smOffset={2}>
                        <FormGroup validationState={this.createNewListForm.$('title').isValid ? 'success' : 'error'}>
                            <ControlLabel>{this.createNewListForm.$('title').label}</ControlLabel>
                            <FormControl {...this.createNewListForm.$('title').bind()} />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </Row>
                <br/>
                { this.createNewListForm.$('lines').map(
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
                                                        this.createNewListForm.$('lines').fields
                                                            .forEach(field => lines.push(field.value));
                                                        let line = lines.splice(index-1, 1);
                                                        lines.splice(index, 0, line);
                                                        let flattened = [];
                                                        for(let i = 0; i < lines.length; ++i) {
                                                            flattened = flattened.concat(lines[i]);
                                                        }
                                                        this.createNewListForm.set({
                                                            lines: flattened
                                                        });
                                                    }}>
                                                        <Glyphicon glyph="arrow-up"/>
                                                    </Button>
                                            }
                                            {
                                                index !== this.createNewListForm.$('lines').fields.size-1 &&
                                                    <Button type="button" onClick={() => {
                                                        let lines = [];
                                                        this.createNewListForm.$('lines').fields
                                                            .forEach(field => lines.push(field.value));
                                                        let line = lines.splice(index+1, 1);
                                                        lines.splice(index, 0, line);
                                                        let flattened = [];
                                                        for(let i = 0; i < lines.length; ++i) {
                                                            flattened = flattened.concat(lines[i]);
                                                        }
                                                        this.createNewListForm.set({
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
                                                this.createNewListForm.$('lines').fields.size !== 1 &&
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
                                            this.createNewListForm.$('lines').fields
                                                .forEach(field => lines.push(field.value));
                                            lines.splice(index+1, 0, '');
                                            this.createNewListForm.update({
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
                                onClick={this.createNewListForm.onSubmit}
                            >
                                Create new list
                            </Button>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        );
    }

})