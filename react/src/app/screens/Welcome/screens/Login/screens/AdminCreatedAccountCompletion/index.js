import React from 'react';
import { Form, FormGroup, FormControl, Button, Col, Row } from 'react-bootstrap'
import { observer } from 'mobx-react'
import MobxReactForm from 'mobx-react-form'
import validatorjs from 'validatorjs'
import { hashHistory } from 'react-router'

const plugins = { dvr: validatorjs };

const fields = [{
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    rules: 'required|email|string|between:5,25'
}, {
    name: 'newPassword',
    label: 'New password',
    placeholder: 'New password',
    rules: 'required|string|between:8,25'
}, {
    name: 'newPasswordConfirmation',
    label: 'New password confirmation',
    placeholder: 'New password again',
    rules: 'same:newPassword'
}];

class AdminCreatedAccountCompletionForm extends MobxReactForm {
    onSuccess(form) {
        if(form.values().newPassword !== form.values().newPasswordConfirmation) {
            form.invalidate('Passwords do not match');
        } else {
            this.user.completeAdminCreatedAccountSignup(
                form.values().newPassword,
                form.values().email,
                () => {
                    this.user.completeAdminCreatedAccountSignupRequired = false;
                    hashHistory.push('/lists');
                },
                (error) => form.invalidate(error)
            );
        }
    }
    onError(form) {
        console.log(form.errors());
        form.invalidate('Error!');
    }
}

const newPasswordForm = new AdminCreatedAccountCompletionForm({ fields }, { plugins });

export default observer(class extends React.Component {

    componentWillMount() {
        newPasswordForm.user = this.props.user;
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <Form onSubmit={newPasswordForm.onSubmit} horizontal>
                            <p>{newPasswordForm.error}</p>
                            <FormGroup>
                                <Col sm={2}>
                                    {newPasswordForm.$('email').label}
                                </Col>
                                <Col sm={8}>
                                    <FormControl {...newPasswordForm.$('email').bind()} />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={2}>
                                    {newPasswordForm.$('newPassword').label}
                                </Col>
                                <Col sm={8}>
                                    <FormControl {...newPasswordForm.$('newPassword').bind()} type="password"/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={2}>
                                    {newPasswordForm.$('newPasswordConfirmation').label}
                                </Col>
                                <Col sm={8}>
                                    {/*mobx-react-form applies text type but we need password so we overwrite it*/}
                                    <FormControl {...newPasswordForm.$('newPasswordConfirmation').bind()} type="password"/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button type="submit" onClick={newPasswordForm.onSubmit}>
                                        Sign in
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
});