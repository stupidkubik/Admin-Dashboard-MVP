import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

const config = [
  {
    ignores: [".next/**", "coverage/**", "public/mockServiceWorker.js"],
  },
  ...nextVitals,
  prettier,
  {
    files: ["components/data-table/useConfiguredTable.ts"],
    rules: {
      "react-hooks/incompatible-library": "off",
    },
  },
];

export default config;
