import {FormGroup} from '../lib/form-group';

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
});
