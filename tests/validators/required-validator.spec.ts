import { requiredValidator } from "../../lib/validators/required-validator";

describe("required validator", () => {
  describe("returns true when", () => {
    test("given number 0", () => {
      expect(requiredValidator(0)).toBe(true);
    });

    test("given any number", () => {
      expect(requiredValidator(1)).toBe(true);
    });

    test("given a string with content", () => {
      expect(requiredValidator("a")).toBe(true);
    });

    test("given a array with items", () => {
      const ar = ["a"];
      expect(requiredValidator(ar)).toBe(true);
    });
  });

  describe("returns false when", () => {
    test("given null", () => {
      expect(requiredValidator(null)).toBe(false);
    });

    test("given undefined", () => {
      expect(requiredValidator(undefined)).toBe(false);
    });

    test("given empty string", () => {
      expect(requiredValidator('')).toBe(false);
    });

    test("given a empty array", () => {
      expect(requiredValidator([])).toBe(false);
    });
  });
});
