import { emailValidator } from "../../lib/validators/email-validator";

describe("Email validator", () => {
  describe("returns true when", () => {
    test("a email address with at least three characters in personal info and two characters as domain name ", () => {
      expect(emailValidator('a@a.ts')).toBe(true);
    });
  });

  describe("returns false when", () => {
    test("missing @", () => {
      expect(emailValidator('a.ts')).toBe(false);
    });

    test("missing domain name", () => {
      expect(emailValidator('a@a')).toBe(false);
    });
  });
});
