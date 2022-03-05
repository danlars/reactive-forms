import { FormControl } from "../lib/form-control";
import { validatorFunctionType } from "../lib/types/validator-function.type";
import { isEmptyValidator } from "../lib/validators/is-empty-validator";

const emptyStringValidator: validatorFunctionType = (value) => {
  const str = value as string;
  return str.length === 0;
}

describe("FormControl", () => {
  describe("Can be created without validators", () => {
    let formControl: FormControl;

    beforeEach(() => {
      formControl = new FormControl("");
    });

    afterEach(() => {
      formControl.release();
    });

    test("Has default value", () => {
      expect(formControl.value).toBe("");
    });

    test("is valid", () => {
      expect(formControl.valid).toBe(true);
    });

    test("errors are null", () => {
      expect(formControl.errors).toBe(null);
    });
  });

  describe("functions with validator", () => {
    let formControl: FormControl;

    beforeEach(() => {
      formControl = new FormControl("", {
        validators: { requiredValidator: isEmptyValidator },
      });
    });

    afterEach(() => {
      formControl.release();
    });

    test("Has default value", () => {
      expect(formControl.value).toBe("");
    });

    test("Is valid because of default value", () => {
      expect(formControl.valid).toBe(true);
    });

    test("Is valid because value contains content", () => {
      formControl.value = 'abc';
      expect(formControl.valid).toBe(true);
    });

    test("Contains error when invalid", () => {
      formControl.value = '';
      expect(formControl.invalid).toBe(true);
      expect(formControl.errors!.requiredValidator).toBe(true);
    });

    test("Invalid input becomes valid when disabling formcontrol", () => {
      formControl.value = '';
      formControl.disableFormControl();
      expect(formControl.valid).toBe(true);
    });

    test("Invalid input becomes invalid again when enabling after disabling", () => {
      formControl.value = '';
      formControl.disableFormControl();
      formControl.enableFormControl();
      expect(formControl.invalid).toBe(true);
    });
  });

  describe("With empty string validator", () => {
    let formControl: FormControl;

    beforeEach(() => {
      formControl = new FormControl("", {
        validators: { emptyStringValidator },
      });
    });

    afterEach(() => {
      formControl.release();
    });

    test("Has empty string value", () => {
      expect(formControl.value).toBe("");
    });

    test("Has empty string error", () => {
      formControl.value = ' ';
      expect(formControl.errors!.emptyStringValidator).toBe(true);
    });
  });

  describe("Released state", () => {
    let formControl: FormControl;

    beforeEach(() => {
      formControl = new FormControl("", {
        validators: { emptyStringValidator },
      });
      formControl.release();
    });

    test("has valid true, even if value doesn't comply with validators", () => {
      formControl.value = '';
      expect(formControl.valid).toBe(true);
    });

    test("has invalid false, even if value doesn't comply with validators", () => {
      formControl.value = '';
      expect(formControl.invalid).toBe(false);
    });

    test("Has no errors even though value is invalid", () => {
      formControl.value = '';
      expect(formControl.errors).toBe(null);
    });
  });
});
