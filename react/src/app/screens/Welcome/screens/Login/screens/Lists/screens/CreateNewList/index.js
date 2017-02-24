import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonGroup, Glyphicon, Col, Grid, Row } from 'react-bootstrap'
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import './index.css';
import autosize from 'autosize';

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
    'lines': 'New lines',
    'lines[]': 'New line'
};

const rules = {
    'title': 'required|string|between:1,140',
    'lines': 'required|array|between:1,10',
    'lines[]': 'required|string|between:1,140'
};

class CreateNewListForm extends MobxReactForm {
    onSuccess(form) {
        console.log('form');
        console.log(form);
        console.log('form.values');
        console.log(form.values());
    }
    onError(form) {
        console.log('form');
        console.log(form);
        console.log('errors');
        console.log(form.errors());
        form.invalidate('Error!');
    }
}

const createNewListForm = new CreateNewListForm({ fields, values, labels, placeholders, rules }, { plugins });

export default observer(class extends React.Component {

    componentWillMount() {
        createNewListForm.user = this.props.user;
    }

    render() {
        return (
            <Grid>
                <Form onSubmit={createNewListForm.onSubmit} horizontal>
                    <Row>
                        <Col xs={12}>
                            <p>{createNewListForm.error}</p>
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
                                                    index === 0 ||
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
                                                    index === createNewListForm.$('lines').fields.size-1 ||
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
                                                    createNewListForm.$('lines').fields.size === 1 ||
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
            </Grid>
        );
    }

})