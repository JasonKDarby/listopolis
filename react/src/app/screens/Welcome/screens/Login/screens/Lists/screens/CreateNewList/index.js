import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonGroup, Glyphicon, Col, Row, Alert } from 'react-bootstrap'
import { observer } from 'mobx-react';
import { hashHistory } from 'react-router'
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import './index.css';
import autosize from 'autosize';
import { createList } from '../../../../../../../../shared/ListAPI';

const plugins = { dvr: validatorjs };

const fields = [
    'title',
    'lines',
    'lines[]'
];

const values = {
    'lines': ['']
};

const labels = {
    'title': 'Title',
    'lines': 'New lines',
    'lines[]': 'New line'
};

const placeholders = {
    'title': 'Title',
    'lines[]': 'New line'
};

const rules = {
    'title': 'required|string|between:1,140',
    'lines': 'required|array|between:1,10',
    'lines[]': 'required|string|between:1,140'
};

class CreateNewListForm extends MobxReactForm {

    errorMessages = [];

    onSuccess(form) {
        this.errorMessages = [];
        let createRequestData = form.values();

        createList(this.user.jwtToken, createRequestData, response => {
            hashHistory.push(`/lists/${response.body.id}`);
        });
    }
    onError(form) {
        this.errorMessages = [];
        if(form.errors().title) {
            if(form.errors().title === "The Title field is required.") {
                this.errorMessages.push(form.errors().title);//Don't do anything, this message is fine.
            } else if(form.errors().title === "The Title field must be between 1 and 140.") {
                this.errorMessages.push(`The Title must be between 1 and 140 characters.`);
            } else {
                this.errorMessages.push(`Error at title: ${form.errors().title}`);
            }
        }
        form.errors().lines.forEach((lineError, index) => {
            if(lineError) {
                if(lineError === "The New line field is required.") {
                    this.errorMessages.push(`Line ${index} can't be empty.`);
                } else if(lineError === "The New line field must be between 1 and 140.") {
                    this.errorMessages.push(`Line ${index} must be between 1 and 140 characters.`);
                } else {
                    this.errorMessages.push(`Error at line ${index}: ${lineError}`);
                }
            }
        });
        form.invalidate('There were errors with your submission.');
    }
}

const createNewListForm = new CreateNewListForm({ fields, values, labels, placeholders, rules }, { plugins });

export default observer(class extends React.Component {

    componentWillMount() {
        createNewListForm.user = this.props.user;
        createNewListForm.reset();
    }

    render() {
        return (
            <Form onSubmit={createNewListForm.onSubmit} horizontal>
                <Row>
                    <Col xs={12} className="text-center">
                        <p><strong>{createNewListForm.error}</strong></p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8} smOffset={2} className="text-center">
                        {
                            createNewListForm.errorMessages.map(
                                (errorMessage, index) =>
                                    <Alert bsStyle="warning" key={index}>{errorMessage}</Alert>)
                        }
                    </Col>
                </Row>
                <Row>
                    <Col sm={8} smOffset={2}>
                        <FormGroup validationState={createNewListForm.$('title').isValid ? 'success' : 'error'}>
                            <ControlLabel>{createNewListForm.$('title').label}</ControlLabel>
                            <FormControl {...createNewListForm.$('title').bind()} />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </Row>
                <br/>
                { createNewListForm.$('lines').map(
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
                                                        createNewListForm.$('lines').fields
                                                            .forEach(field => lines.push(field.value));
                                                        let line = lines.splice(index-1, 1);
                                                        lines.splice(index, 0, line);
                                                        let flattened = [];
                                                        for(let i = 0; i < lines.length; ++i) {
                                                            flattened = flattened.concat(lines[i]);
                                                        }
                                                        createNewListForm.set({
                                                            lines: flattened
                                                        });
                                                    }}>
                                                        <Glyphicon glyph="arrow-up"/>
                                                    </Button>
                                            }
                                            {
                                                index !== createNewListForm.$('lines').fields.size-1 &&
                                                    <Button type="button" onClick={() => {
                                                        let lines = [];
                                                        createNewListForm.$('lines').fields
                                                            .forEach(field => lines.push(field.value));
                                                        let line = lines.splice(index+1, 1);
                                                        lines.splice(index, 0, line);
                                                        let flattened = [];
                                                        for(let i = 0; i < lines.length; ++i) {
                                                            flattened = flattened.concat(lines[i]);
                                                        }
                                                        createNewListForm.set({
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
                                                createNewListForm.$('lines').fields.size !== 1 &&
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
                                            createNewListForm.$('lines').fields
                                                .forEach(field => lines.push(field.value));
                                            lines.splice(index+1, 0, '');
                                            createNewListForm.update({
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
                                onClick={createNewListForm.onSubmit}
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