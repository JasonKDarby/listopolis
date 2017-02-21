import React from 'react'
import { Form, FormGroup, FormControl, Button, Col } from 'react-bootstrap'
import { observer } from 'mobx-react'
import MobxReactForm from 'mobx-react-form'
import validatorjs from 'validatorjs'
import { user } from '../../../../../shared/Store'
import { hashHistory } from 'react-router'

const plugins = { dvr: validatorjs }

const fields = [{
    name: 'username',
    label: 'Username',
    placeholder: 'Username',
    rules: 'required|string|between:5,25'
}, {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    rules: 'required|string|between:8,25'
}]

class LoginForm extends MobxReactForm {
    onSuccess(form) {
        user.login(
            form.values().username,
            form.values().password,
            () => {
                hashHistory.push('/lists')
            },
            (error) => {
                form.invalidate(error.message)
            }
        )
    }
    onError(form) {
        form.invalidate('Error!')
    }
}

const loginForm = new LoginForm({ fields }, { plugins })

export default observer(() =>
    <Form onSubmit={loginForm.onSubmit} horizontal>
        <p>{loginForm.error}</p>
        <FormGroup>
            <Col sm={2}>
                {loginForm.$('username').label}
            </Col>
            <Col sm={8}>
                <FormControl {...loginForm.$('username').bind()}/>
            </Col>
        </FormGroup>
        <FormGroup>
            <Col sm={2}>
                {loginForm.$('password').label}
            </Col>
            <Col sm={8}>
                {/*mobx-react-form applies text type but we need password so we overwrite it*/}
                <FormControl {...loginForm.$('password').bind()} type="password"/>
            </Col>
        </FormGroup>
        <FormGroup>
            <Col smOffset={2} sm={10}>
                <Button type="submit" onClick={loginForm.onSubmit}>
                    Sign in
                </Button>
            </Col>
        </FormGroup>
    </Form>
)