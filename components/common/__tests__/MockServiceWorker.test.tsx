import { render, screen, waitFor } from "@testing-library/react";
import MockServiceWorker, {
  shouldEnableApiMocking,
} from "../MockServiceWorker";
import { startBrowserWorker } from "../../../mocks/browser";

jest.mock("../../../mocks/browser", () => ({
  startBrowserWorker: jest.fn(),
}));

const mockedStartBrowserWorker = startBrowserWorker as jest.MockedFunction<
  typeof startBrowserWorker
>;

describe("MockServiceWorker", () => {
  const originalMode = process.env.NEXT_PUBLIC_API_MOCKING;

  afterEach(() => {
    if (originalMode === undefined) {
      delete process.env.NEXT_PUBLIC_API_MOCKING;
    } else {
      process.env.NEXT_PUBLIC_API_MOCKING = originalMode;
    }
    mockedStartBrowserWorker.mockReset();
  });

  it("treats an explicit disabled mode as authoritative", () => {
    expect(shouldEnableApiMocking("disabled", "development")).toBe(false);
    expect(shouldEnableApiMocking("enabled", "production")).toBe(true);
    expect(shouldEnableApiMocking(undefined, "development")).toBe(true);
    expect(shouldEnableApiMocking(undefined, "production")).toBe(false);
  });

  it("renders children immediately when mocking is disabled", () => {
    process.env.NEXT_PUBLIC_API_MOCKING = "disabled";

    render(
      <MockServiceWorker>
        <div>Application</div>
      </MockServiceWorker>,
    );

    expect(screen.getByText("Application")).toBeInTheDocument();
    expect(mockedStartBrowserWorker).not.toHaveBeenCalled();
  });

  it("waits for the worker before mounting API consumers", async () => {
    process.env.NEXT_PUBLIC_API_MOCKING = "enabled";
    let resolveWorker:
      ((registration: ServiceWorkerRegistration) => void) | undefined;
    mockedStartBrowserWorker.mockImplementation(
      () =>
        new Promise<ServiceWorkerRegistration>((resolve) => {
          resolveWorker = resolve;
        }),
    );

    render(
      <MockServiceWorker>
        <div>Application</div>
      </MockServiceWorker>,
    );

    expect(screen.queryByText("Application")).not.toBeInTheDocument();
    await waitFor(() =>
      expect(mockedStartBrowserWorker).toHaveBeenCalledTimes(1),
    );
    resolveWorker?.({} as ServiceWorkerRegistration);

    await waitFor(() =>
      expect(screen.getByText("Application")).toBeInTheDocument(),
    );
  });
});
