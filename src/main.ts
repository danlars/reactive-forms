import { FormControl } from "../lib/form-control";
import { FormGroup } from "../lib/form-group";
import { emailValidator } from "../lib/validators/email-validator";
import { requiredValidator } from "../lib/validators/required-validator";

const firstNameInput = document.querySelector('#firstName') as HTMLInputElement;
const firstNameRequiredElement = document.querySelector('#firstNameRequiredElement') as HTMLInputElement;
const lastNameInput = document.querySelector('#lastName') as HTMLInputElement;
const emailInput = document.querySelector('#email') as HTMLInputElement;
const emailRequiredElement = document.querySelector('#emailRequiredElement') as HTMLInputElement;
const emailValidationElement = document.querySelector('#emailValidationElement') as HTMLInputElement;
const hobbiesSelect = document.querySelector('#hobbies') as HTMLSelectElement;
const hobbiesRequiredElement = document.querySelector('#hobbiesRequiredElement') as HTMLInputElement;

const lastNameFormControl = new FormControl('');
const emailFormControl = new FormControl('', {
    validators: {requiredValidator, emailValidator},
});
const hobbiesFormControl = new FormControl([], {
    validators: {requiredValidator},
});
const formGroup = new FormGroup({
    controls: {
        firstName: new FormControl('', {
            validators: {requiredValidator}
        }),
        lastName: lastNameFormControl,
        email: emailFormControl,
        hobbies: hobbiesFormControl,
    }
});
const showInvalidElement = (element: HTMLElement, isInvalid = false) => {
    if (isInvalid) {
        element.classList.remove('d-none');
    } else {
        element.classList.add('d-none');
    }
};

// -------------

firstNameInput!.addEventListener('input', (event: Event) => {
    const element = event.target as HTMLInputElement;
    formGroup.controls.firstName.value = element.value;
    showInvalidElement(firstNameRequiredElement, formGroup.controls.firstName.errors?.requiredValidator);
    console.log('formGroup', formGroup.valid, formGroup.errors);
});

lastNameInput!.addEventListener('input', (event: Event) => {
    const element = event.target as HTMLInputElement;
    lastNameFormControl.value = element.value;
    console.log('formGroup', formGroup.valid, formGroup.errors);
});

emailInput!.addEventListener('input', (event: Event) => {
    const element = event.target as HTMLInputElement;
    emailFormControl.value = element.value;

    showInvalidElement(emailRequiredElement, emailFormControl.errors?.requiredValidator);
    showInvalidElement(emailValidationElement, emailFormControl.errors?.emailValidator);
    console.log('formGroup', formGroup.valid, formGroup.errors);
});

hobbiesSelect!.addEventListener('input', (event: Event) => {
    const element = event.target as HTMLSelectElement;
    const selectedOptions = [];
    hobbiesFormControl.value.splice(0, hobbiesFormControl.value.length);
    for (const option of element.options) {
        if (option.selected) {
            selectedOptions.push(option.value);
        }
    }
    hobbiesFormControl.value.push(...selectedOptions);
    showInvalidElement(hobbiesRequiredElement, hobbiesFormControl.errors?.requiredValidator);
});