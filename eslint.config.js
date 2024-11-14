import { defineConfig } from "eslint-define-config";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default defineConfig({
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      browser: true,
      es2021: true,
      jest: true,
    },
  },
  plugins: {
    react: eslintPluginReact,
    prettier: eslintPluginPrettier,
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": ["error"],
  },
});
