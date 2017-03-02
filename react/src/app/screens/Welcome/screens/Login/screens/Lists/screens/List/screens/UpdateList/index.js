import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { createListFormWithInitialState } from '../../../CreateNewList/shared/ListFormInternals';
import ListForm from '../../../CreateNewList/shared/ListForm';
import { getListById, updateList } from '../../../../../../../../../../shared/ListAPI';
import LoadingWithBlinkingDots from '../../../../shared/LoadingWithBlinkingDots';

export default observer(class extends React.Component {

    finishedFetch = observable(false);

    componentDidMount() {
        this.finishedFetch.set(false);
        getListById(this.props.user.jwtToken, this.props.params.id, response => {
            this.updateListForm = createListFormWithInitialState(response.body, (requestData) => {
                updateList(this.props.user.jwtToken, this.props.params.id, requestData, response => {
                    this.props.history.push(`/lists/${this.props.params.id}`);
                });
            });
            this.finishedFetch.set(true);
            this.updateListForm.reset();
        });
    }

    render() {
        return (
            <div>
                {
                    this.finishedFetch.get() ?
                        <ListForm form={this.updateListForm} submitButtonText="Update list" />
                        : <LoadingWithBlinkingDots/>
                }
            </div>
        );
    }

});