import React from 'react';
import { Form, FormGroup, FormControl, Button, Col, Grid, Row } from 'react-bootstrap'
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import './index.css';

const plugins = { dvr: validatorjs };

const fields = [
    'title',
    'lines',
    'lines[]'
];

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

const createNewListForm = new CreateNewListForm({ fields, labels, placeholders, rules }, { plugins });

createNewListForm.update({
    lines: ['']
});

export default observer(class extends React.Component {

    componentWillMount() {
        createNewListForm.user = this.props.user;
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Form onSubmit={createNewListForm.onSubmit} horizontal>
                            <p>{createNewListForm.error}</p>
                            <Col sm={8} smOffset={2}>
                                {createNewListForm.$('title').label}
                            </Col>
                            <FormGroup>
                                <Col sm={8} smOffset={2}>
                                    <FormControl {...createNewListForm.$('title').bind()} />
                                </Col>
                            </FormGroup>
                            <br/>
                            { createNewListForm.$('lines').map(
                                line =>
                                    <FormGroup key={line.key}>
                                        <Col sm={8} smOffset={2}>
                                            {/*TODO: I want this to auto grow*/}
                                            <FormControl componentClass="textarea" {...line.bind()} />
                                            <Button type="button" onClick={line.onClear}>clear</Button>
                                            <Button type="button" onClick={line.onDel}>delete</Button>
                                        </Col>
                                    </FormGroup>
                            )}
                            <br/>
                            <FormGroup>
                                <Col sm={8} smOffset={2}>
                                    <Button type="button" onClick={createNewListForm.$('lines').onAdd}>add</Button>
                                </Col>
                            </FormGroup>
                            <br/>
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button type="submit" onClick={createNewListForm.onSubmit}>
                                        Create new list
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        );
    }

})