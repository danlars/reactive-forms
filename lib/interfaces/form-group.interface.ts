import { FormControlInterface } from "./form-control.interface";
import { FormGroupControlsInterface } from "./form-group-controls.interface";

export interface FormGroupInterface {
    valid: boolean;
    invalid: boolean;
    controls: FormGroupControlsInterface,
    addControl: (name: string, control: FormControlInterface) => void;
    removeControl: (name: string) => void;
}