import { ValidationErrorsInterface } from "./validation-errors.interface";

export interface FormGroupValidationErrorsInterface {
    [key: string]: ValidationErrorsInterface;
}