import { act, renderHook } from "@testing-library/react";
import { usePasswordStrength } from "../usePasswordStrength";

describe("usePasswordStrength", () => {
  it("updates strength from a password and resets to its initial value", () => {
    const { result } = renderHook(() => usePasswordStrength(1));

    act(() => result.current.handlePasswordChange("Password1!"));
    expect(result.current.strength).toBe(5);

    act(() => result.current.resetStrength());
    expect(result.current.strength).toBe(1);
  });
});
