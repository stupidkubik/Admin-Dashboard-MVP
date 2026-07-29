import { renderHook } from "@testing-library/react";
import { useIsHydrated } from "../useIsHydrated";

describe("useIsHydrated", () => {
  it("reports hydration after the client subscribes", () => {
    const { result } = renderHook(() => useIsHydrated());

    expect(result.current).toBe(true);
  });
});
