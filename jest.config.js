const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/tests/e2e/"],
  transformIgnorePatterns: [
    "/node_modules/(?!(?:msw|@mswjs|@open-draft|until-async|rettime)/)",
  ],
  collectCoverageFrom: [
    "<rootDir>/lib/**/*.{ts,tsx}",
    "<rootDir>/components/ui/**/*.{ts,tsx}",
    "<rootDir>/app/api/**/*.{ts,tsx}",
    "!<rootDir>/**/*.d.ts",
    "!<rootDir>/**/__tests__/**",
    "!<rootDir>/mocks/data/**",
    "!<rootDir>/components/examples/**",
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
