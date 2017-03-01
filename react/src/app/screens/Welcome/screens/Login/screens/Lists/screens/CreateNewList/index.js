import React from 'react';
import { createList } from '../../../../../../../../shared/ListAPI';
import { createEmptyListForm } from './shared/ListFormInternals';
import ListForm from './shared/ListForm';

export default class extends React.Component {

    componentWillMount() {
        this.createNewListForm = createEmptyListForm((requestData) => {
            createList(this.props.user.jwtToken, requestData, response => {
                this.props.history.push(`/lists/${response.body.id}`);
            });
        });
        this.createNewListForm.reset();
    }

    render() {
        return (<ListForm form={this.createNewListForm}/>);
    }

}