import { FormControlInterface } from "./interfaces/form-control.interface";
import { ValidatorFunctionsInterface } from "./interfaces/validator-functions.interface";
import { ValidationErrorsInterface } from "./interfaces/validation-errors.interface";
import { formValueType } from "./types/form-value.type";
import {addWatcher, removeWatcher} from './utils/proxy-listener';

export class FormControl implements FormControlInterface {
  private _valid = true;
  private _invalid = false;
  private _value: formValueType;
  private _errors: null | ValidationErrorsInterface = null;
  private _released = false;
  private validatorKeys: Array<string> = [];
  private options: { validators?: ValidatorFunctionsInterface } = {};
  private isDisabled = false;

  get errors() {
    if (this.isDisabled || this._released) {
      return null;
    }
    return this._errors;
  }

  get invalid() {
    if (this.isDisabled || this._released) {
      return false;
    }
    return this._invalid;
  }

  get valid() {
    if (this.isDisabled || this._released) {
      return true;
    }
    return this._valid;
  }

  get value() {
    return this._value;
  }
  set value(value: formValueType) {
    if (this._released) {
      this._value = value;
    } else {
      this.setValue(value);
      this.runValidations();
    }
  }

  constructor(
    value: formValueType,
    options: { validators?: ValidatorFunctionsInterface } = {}
  ) {
    if (
        !Array.isArray(value) &&
        typeof value === "object" &&
        value != null
    ) {
      throw new Error("FormControl does not support objects");
    }
    this.options = options;
    if ("validators" in options) {
      // @ts-ignore
      this.validatorKeys = Object.keys(options.validators);
    }
    this.setValue(value);
  }

  disableFormControl() {
    this.isDisabled = true;
  }

  enableFormControl() {
    this.isDisabled = false;
  }

  runValidations() {
    this.runValidators(this.value);
  }

  release() {
    removeWatcher(this.value, this.runValidationFromProxy);
    this._released = true;
  }

  runValidators(value: formValueType) {
    const validators: ValidatorFunctionsInterface =
      this.options.validators || {};
    let errorsValue = null;
    let errors: ValidationErrorsInterface = {};
    this.validatorKeys.forEach((keyName) => {
      const isValidValidation = validators[keyName](value);
      if (!isValidValidation) {
        errors[keyName] = !isValidValidation;
      }
    });
    const isValid = Object.keys(errors).length === 0;

    if (!isValid) {
      errorsValue = errors;
    }

    this._valid = isValid;
    this._invalid = !isValid;
    this._errors = errorsValue;
  }

  private setValue(value: formValueType) {
    let tmpValue = value;
    // @ts-ignore
    if (Array.isArray(value)) {
      tmpValue = addWatcher(value, this.runValidationFromProxy);
    }

    this._value = tmpValue;
  }

  private runValidationFromProxy = () => {
    this.runValidations();
  }
}
