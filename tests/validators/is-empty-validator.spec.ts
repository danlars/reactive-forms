import { isEmptyValidator } from "../../lib";

describe("Is empty validator", () => {
  describe("returns true when", () => {
    test("given number 0", () => {
      expect(isEmptyValidator(0)).toBe(true);
    });

    test("given any number", () => {
      expect(isEmptyValidator(1)).toBe(true);
    });

    test("given a string with content", () => {
      expect(isEmptyValidator("a")).toBe(true);
    });

    test("given a array with items", () => {
      const ar = ["a"];
      expect(isEmptyValidator(ar)).toBe(true);
    });
  });

  describe("returns false when", () => {
    test("given null", () => {
      expect(isEmptyValidator(null)).toBe(false);
    });

    test("given undefined", () => {
      expect(isEmptyValidator(undefined)).toBe(false);
    });

    test("given empty string", () => {
      expect(isEmptyValidator('')).toBe(false);
    });

    test("given a empty array", () => {
      expect(isEmptyValidator([])).toBe(false);
    });
  });
});
