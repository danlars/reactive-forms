import {FormControlInterface} from "./interfaces/form-control.interface";
import {FormGroupControlsInterface} from "./interfaces/form-group-controls.interface";
import {FormGroupOptionsInterface} from "./interfaces/form-group-options.interface";
import {FormGroupValidationErrorsInterface} from "./interfaces/form-group-validation-errors.interface";
import {FormGroupInterface} from "./interfaces/form-group.interface";
import {addWatcher, removeWatcher} from './utils/proxy-listener';
import {FormControl} from './form-control';

export class FormGroup implements FormGroupInterface {
    private _errors: FormGroupValidationErrorsInterface = {};
    private _valid = true;
    private _invalid = false;
    private _released = false;
    private _controls: FormGroupControlsInterface = {};
    private controlKeyNames: string[] = [];

    get controls() {
        if (this._released) {
            return {};
        }
        return this._controls;
    }

    get valid() {
        if (this._released) {
            return true;
        }
        return this._valid;
    }

    get invalid() {
        if (this._released) {
            return false;
        }
        return this._invalid;
    }

    get errors() {
        if (this._released) {
            return {};
        }
        return this._errors;
    }

    constructor(options: FormGroupOptionsInterface = {}) {
        if ('controls' in options) {
            // @ts-ignore
            this.addControls(options.controls);
        }
    }

    addControl(name: string, control: FormControlInterface) {
        if (this._released) {
            return;
        }
        this._controls[name] = addWatcher(control, this.validateFormControl);
        if (Array.isArray(control.value)) {
            addWatcher(control.value, this.validateFormControlFromValue);
        }
        this.controlKeyNames = Object.keys(this._controls);
        this.validateControl(name);
    }

    removeControl(name: string) {
        if (this._released) {
            return;
        }
        const control = this._controls[name];
        removeWatcher(control, this.validateFormControl);
        if (Array.isArray(control.value)) {
            removeWatcher(control.value, this.validateFormControlFromValue);
        }
        delete this._controls[name];
        this.controlKeyNames = Object.keys(this._controls);
    }

    release() {
        for (const controlKeyName of this.controlKeyNames) {
            this.removeControl(controlKeyName);
        }
        this._released = true;
    }

    private addControls(controls: FormGroupControlsInterface) {
        const controlKeyNames = Object.keys(controls);
        for (const controlKeyName of controlKeyNames) {
            const control = controls[controlKeyName];
            this.addControl(controlKeyName, control);
        }
    }

    private validateFormControl = (oldValue: any, newValue: any, receiver: FormControl) => {
        const controlName = this.controlKeyNames.find((controlKeyName) => {
            return this._controls[controlKeyName] === receiver;
        });
        if (controlName) {
            this.validateControl(controlName);
            this.validateControls();
        }
    }

    private validateFormControlFromValue = (oldValue: any, newValue: any, receiver: Array<any>) => {
        const controlName = this.controlKeyNames.find((controlKeyName) => {
            return this._controls[controlKeyName].value === receiver;
        });
        if (controlName) {
            this.validateControl(controlName);
            this.validateControls();
        }
    }

    private validateControls() {
        this._valid = true;
        this._invalid = false;
        this._errors = {};
        for (const controlKeyName of this.controlKeyNames) {
            this.validateControl(controlKeyName);
        }
    }

    private validateControl(name: string) {
        const control = this._controls[name];
        this._errors[name] = control.errors || {};
        if (control.invalid) {
            this._valid = false;
            this._invalid = true;
        }
    }
}
