import { FormGroup, FormControl, isEmptyValidator, emailValidator } from "../lib";

const firstNameInput = document.querySelector('#firstName') as HTMLInputElement;
const firstNameRequiredElement = document.querySelector('#firstNameRequiredElement') as HTMLInputElement;
const lastNameInput = document.querySelector('#lastName') as HTMLInputElement;
const emailInput = document.querySelector('#email') as HTMLInputElement;
const emailRequiredElement = document.querySelector('#emailRequiredElement') as HTMLInputElement;
const emailValidationElement = document.querySelector('#emailValidationElement') as HTMLInputElement;
const hobbiesSelect = document.querySelector('#hobbies') as HTMLSelectElement;
const hobbiesRequiredElement = document.querySelector('#hobbiesRequiredElement') as HTMLInputElement;

const formGroup = new FormGroup({
    controls: {
        firstName: new FormControl('', {
            validators: {requiredValidator: isEmptyValidator}
        }),
        lastName: new FormControl(''),
        email: new FormControl('', {
            validators: {requiredValidator: isEmptyValidator, emailValidator},
        }),
        hobbies: new FormControl([], {
            validators: {requiredValidator: isEmptyValidator},
        }),
    }
});
const controls = formGroup.controls;
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
    controls.firstName.value = element.value;
    showInvalidElement(firstNameRequiredElement, formGroup.controls.firstName.errors?.requiredValidator);
    console.log('formGroup', formGroup.valid, formGroup.errors);
});

lastNameInput!.addEventListener('input', (event: Event) => {
    const element = event.target as HTMLInputElement;
    controls.lastName.value = element.value;
    console.log('formGroup', formGroup.valid, formGroup.errors);
});

emailInput!.addEventListener('input', (event: Event) => {
    const element = event.target as HTMLInputElement;
    controls.email.value = element.value;

    showInvalidElement(emailRequiredElement, formGroup.controls.email.errors?.requiredValidator);
    showInvalidElement(emailValidationElement, formGroup.controls.email.errors?.emailValidator);
    console.log('formGroup', formGroup.valid, formGroup.errors);
});

hobbiesSelect!.addEventListener('input', (event: Event) => {
    const element = event.target as HTMLSelectElement;
    const selectedOptions = [];
    // controls.hobbies.value = [];
    controls.hobbies.value.splice(0, controls.hobbies.value.length);
    for (const option of element.options) {
        if (option.selected) {
            selectedOptions.push(option.value);
        }
    }
    controls.hobbies.value.push(...selectedOptions);
    console.log('formGroup', formGroup.valid, formGroup.errors);
    showInvalidElement(hobbiesRequiredElement, formGroup.errors.hobbies.requiredValidator);
});
