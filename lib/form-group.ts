import { FormControlInterface } from "./interfaces/form-control.interface";
import { FormGroupControlsInterface } from "./interfaces/form-group-controls.interface";
import { FormGroupOptionsInterface } from "./interfaces/form-group-options.interface";
import { FormGroupValidationErrorsInterface } from "./interfaces/form-group-validation-errors.interface";
import { FormGroupInterface } from "./interfaces/form-group.interface";

export class FormGroup implements FormGroupInterface {
    private _errors: FormGroupValidationErrorsInterface = {};
    private _valid = true;
    private _invalid = false;
    private controlKeyNames: string[] = [];
    controls: FormGroupControlsInterface = {};

    get valid() {
        return this._valid;
    }

    get invalid() {
        return this._invalid;
    }

    get errors() {
        return this._errors;
    }

    constructor(options: FormGroupOptionsInterface = {}) {
        if ('controls' in options) {
            // @ts-ignore
            this.addControls(options.controls);
        }
    }
    
    addControl(name: string, control: FormControlInterface) {
        this.controls[name] = this.getProxyControl(control);
        this.controlKeyNames = Object.keys(this.controls);
        this.runControlValidation(name);
    }

    removeControl(name: string) {
        delete this.controls[name];
        this.controlKeyNames = Object.keys(this.controls);
    };

    private addControls(controls: FormGroupControlsInterface) {
        const controlKeyNames = Object.keys(controls);
        for (const controlKeyName of controlKeyNames) {
            const control = controls[controlKeyName];
            this.addControl(controlKeyName, control);
        }
    }

    private getProxyControl(control: FormControlInterface) {
        return new Proxy(control, {
            set: (control: any, prop: string, value: any) => {
                control[prop] = value;
                if (prop !== 'value') {
                    return true;
                }
                this.runValidations();
                return true;
            },
        });
    }

    private runValidations() {
        this._valid = true;
        this._invalid = false;
        this._errors = {};
        for (const controlKeyName of this.controlKeyNames) {
            this.runControlValidation(controlKeyName);
        }
    }

    private runControlValidation(name: string) {
        const control = this.controls[name];
        this._errors[name] = control.errors || {};
        if (control.invalid) {
            this._valid = false;
            this._invalid = true;
        }
    }
}