import { FormGroup } from "../lib/form-group";
import { FormControl } from "../lib/form-control";
import { requiredValidator, emailValidator } from "../lib/validators";

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
          requiredValidator,
          emailValidator,
        }
      });
      formGroup = new FormGroup({
        controls: {
          firstName: formControl,
        }
      });
    });

    test("has Errors from formControl", () => {
      formGroup.controls.firstName.value = [];
      expect(formGroup.errors.firstName).toEqual(formControl.errors);
    });

    test("Aligns with errors in form control when one validation errors disappears", () => {
      formGroup.controls.firstName.value = [];
      formGroup.controls.firstName.value.push('');
      expect('requiredValidator' in formGroup.errors.firstName).toBe(false);
    });
  });
});
