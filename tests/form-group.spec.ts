import {FormGroup, FormControl, isEmptyValidator, emailValidator} from "../lib";

describe("FormGroup", () => {
    describe("Without controls", () => {
        let formGroup: FormGroup;

        beforeEach(() => {
            formGroup = new FormGroup();
        });

        test("has valid true", () => {
            expect(formGroup.valid).toBe(true);
        });

        test("has invalid false", () => {
            expect(formGroup.invalid).toBe(false);
        });

        test("has empty errors object", () => {
            expect(formGroup.errors).toEqual({});
        });
    });

    describe("With controls", () => {
        let formGroup: FormGroup;
        let formControl: FormControl;

        beforeEach(() => {
            formControl = new FormControl([], {
                validators: {
                    isEmptyValidator,
                    emailValidator,
                }
            });
            formGroup = new FormGroup({
                controls: {
                    list: formControl,
                }
            });
        });

        test("has Errors from formControl", () => {
            formGroup.controls.list.value = [];
            expect(formGroup.errors.list).toEqual(formControl.errors);
        });

        test("Aligns with errors in form control when one validation errors disappears", () => {
            formGroup.controls.list.value = [];
            formGroup.controls.list.value.push('Hello');
            expect('isEmptyValidator' in formGroup.errors.list).toBe(false);
        });
    });

    describe("When released", () => {
        let formGroup: FormGroup;
        let formControl: FormControl;

        beforeEach(() => {
            formControl = new FormControl([], {
                validators: {
                    isEmptyValidator,
                    emailValidator,
                }
            });
            formGroup = new FormGroup();
            formGroup.release();
        });

        afterEach(() => {
            formControl.release();
        });

        test("Doesn't display any controls", () => {
            formGroup.addControl('test', formControl);
            expect(formGroup.controls).toEqual({});
        });

        test("Resets validations to pristine state", () => {
            formControl.value = '';
            formGroup.addControl('test', formControl);
            expect(formGroup.valid).toBe(true);
            expect(formGroup.invalid).toBe(false);
            expect(formGroup.errors).toEqual({});
        });
    });
});
