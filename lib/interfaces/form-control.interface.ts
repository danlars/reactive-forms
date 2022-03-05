import { ValidationErrorsInterface } from "./validation-errors.interface";

export interface FormControlInterface {
    valid: boolean;
    errors: ValidationErrorsInterface | null;
    invalid: boolean;
    value: any;
    disable: () => void,
    enable: () => void,
    runValidations: () => void,
    release: () => void;
}
