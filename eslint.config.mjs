import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

const config = [
  {
    ignores: [".next/**", "coverage/**", "public/mockServiceWorker.js"],
  },
  ...nextVitals,
  prettier,
  {
    // These React Compiler rules expose existing component architecture work.
    // Re-enable them after the Stage 4 UI refactor, rather than mixing behavior
    // changes into the toolchain upgrade.
    rules: {
      "react-hooks/incompatible-library": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
    },
  },
];

export default config;
