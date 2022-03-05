import { formValueType } from "../types/form-value.type";
import { validatorFunctionType } from "../types/validator-function.type";

export const isEmptyValidator: validatorFunctionType = (value: formValueType) => {
    let isValid = true;
    if (Array.isArray(value)) {
        isValid = value.length > 0;
    } else if (value == null || value === '') {
        isValid = false;
    }

    return isValid;
};
