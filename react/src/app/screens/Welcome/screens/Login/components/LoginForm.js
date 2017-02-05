import React from 'react'
import { Form, FormGroup, FormControl, Checkbox, Button, Col } from 'react-bootstrap'
import { observer } from 'mobx-react'
import MobxReactForm from 'mobx-react-form'
import validatorjs from 'validatorjs'
import Auth from '../../../../../Auth'

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

class LoginFormBacking extends MobxReactForm {
    onSuccess(form) {
        console.log('Form Values!', form.values())
        Auth.login(form.values().username, form.values().password, () => {}, (error) => {})
    }
    onError(form) {
        console.log('All form errors', form.errors())
        form.invalidate('Error!')
    }
}

const loginFormBacking = new LoginFormBacking({ fields }, { plugins })

const LoginForm = observer(() =>
    <Form onSubmit={loginFormBacking.onSubmit} horizontal>
        <FormGroup>
            <Col sm={2}>
                {loginFormBacking.$('username').label}
            </Col>
            <Col sm={8}>
                <FormControl {...loginFormBacking.$('username').bind()}/>
            </Col>
        </FormGroup>
        <FormGroup>
            <Col sm={2}>
                {loginFormBacking.$('password').label}
            </Col>
            <Col sm={8}>
                <FormControl {...loginFormBacking.$('password').bind()}/>
            </Col>
        </FormGroup>
        <FormGroup>
            <Col smOffset={2} sm={10}>
                <Checkbox>Remember me</Checkbox>
            </Col>
        </FormGroup>
        <FormGroup>
            <Col smOffset={2} sm={10}>
                <Button type="submit" onClick={loginFormBacking.onSubmit}>
                    Sign in
                </Button>
            </Col>
        </FormGroup>
        <p>{loginFormBacking.error}</p>
    </Form>
)

export default LoginForm