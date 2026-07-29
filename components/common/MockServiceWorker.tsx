"use client";

import { useEffect, useState, type ReactNode } from "react";

export function shouldEnableApiMocking(
  configuredMode = process.env.NEXT_PUBLIC_API_MOCKING,
  nodeEnv = process.env.NODE_ENV,
): boolean {
  if (configuredMode === "disabled") {
    return false;
  }
  if (configuredMode === "enabled") {
    return true;
  }

  return nodeEnv === "development";
}

export default function MockServiceWorker({
  children,
}: {
  children: ReactNode;
}) {
  const shouldMock = shouldEnableApiMocking();
  const [isReady, setIsReady] = useState(!shouldMock);

  useEffect(() => {
    if (!shouldMock) {
      return;
    }

    let cancelled = false;

    const startMocking = async () => {
      try {
        const { startBrowserWorker } = await import("@/mocks/browser");
        if (!cancelled) {
          await startBrowserWorker();
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[MSW] Failed to start service worker", error);
        }
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    };

    void startMocking();

    return () => {
      cancelled = true;
    };
  }, [shouldMock]);

  return isReady ? children : null;
}
