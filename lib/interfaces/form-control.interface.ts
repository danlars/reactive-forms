import { ValidationErrorsInterface } from "./validation-errors.interface";

export interface FormControlInterface {
    valid: boolean;
    errors: ValidationErrorsInterface | null;
    invalid: boolean;
    value: any;
    disableFormControl: () => void,
    enableFormControl: () => void,
    runValidations: () => void,
}