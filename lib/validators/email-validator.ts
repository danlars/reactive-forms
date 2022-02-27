import { formValueType } from "../types/form-value.type";
import { validatorFunctionType } from "../types/validator-function.type";

export const emailValidator: validatorFunctionType = (email: formValueType) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email as string);
};