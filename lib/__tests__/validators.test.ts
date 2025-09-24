import { getPasswordStrength, userSchema } from "../validators";

describe("userSchema", () => {
  const baseUser = {
    name: "Jane Doe",
    email: "jane@example.com",
    role: "admin",
    active: true,
    password: "Password1!",
    confirmPassword: "Password1!",
    dateOfBirth: "1990-01-01",
    skills: ["React"],
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "12345",
      country: "US",
    },
    agreement: true,
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  };

  it("validates a correct user", () => {
    expect(userSchema.parse(baseUser)).toMatchObject(baseUser);
  });

  it("rejects invalid email", () => {
    const data = {
      ...baseUser,
      email: "invalid",
    };
    expect(() => userSchema.parse(data)).toThrow("Invalid email address");
  });

  it("rejects when passwords don't match", () => {
    const data = {
      ...baseUser,
      confirmPassword: "Mismatch123!",
    };
    expect(() => userSchema.parse(data)).toThrow("Passwords don't match");
  });

  it("requires the user to be at least 18 years old", () => {
    const data = {
      ...baseUser,
      dateOfBirth: "2010-01-01",
    };
    expect(() => userSchema.parse(data)).toThrow(
      "Must be at least 18 years old",
    );
  });

  it("enforces agreement acceptance", () => {
    const data = {
      ...baseUser,
      agreement: false,
    };
    expect(() => userSchema.parse(data)).toThrow("You must agree to the terms");
  });
});

describe("getPasswordStrength", () => {
  it("returns 0 for an empty password", () => {
    expect(getPasswordStrength("")).toBe(0);
  });

  it("returns max strength for a complex password", () => {
    expect(getPasswordStrength("Password1!")).toBe(5);
  });

  it("counts individual character classes", () => {
    expect(getPasswordStrength("lowercase")).toBe(2); // length + lowercase
    expect(getPasswordStrength("LOWERCASE")).toBe(2); // length + uppercase
    expect(getPasswordStrength("12345678")).toBe(2); // length + digits
  });
});
