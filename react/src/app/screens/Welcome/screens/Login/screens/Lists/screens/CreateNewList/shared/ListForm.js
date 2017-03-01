import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

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
    'lines[]': 'New line'
};

const rules = {
    'title': 'required|string|between:1,140',
    'lines': 'required|array|between:1,10',
    'lines[]': 'required|string|between:1,140'
};

class ListForm extends MobxReactForm {

    errorMessages = [];

    onSuccess(form) {
        this.errorMessages = [];
        let requestData = form.values();

        this.onSuccessCallback(requestData);
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

export const createListFormWithInitialState = (values, onSuccessCallback) => {
    let listForm = new ListForm({ fields, values, labels, placeholders, rules}, { plugins });
    listForm.onSuccessCallback = onSuccessCallback;
    return listForm;
};

export const createEmptyListForm = (onSuccessCallback) =>
    createListFormWithInitialState({ 'lines': [''] }, onSuccessCallback);