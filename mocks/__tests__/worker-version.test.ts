/** @jest-environment node */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import packageMetadata from "../../package.json";

describe("browser worker artifact", () => {
  it("matches the installed MSW package version", () => {
    const worker = readFileSync(
      join(process.cwd(), "public/mockServiceWorker.js"),
      "utf8",
    );

    expect(worker).toContain(
      `const PACKAGE_VERSION = '${packageMetadata.devDependencies.msw}'`,
    );
  });
});
