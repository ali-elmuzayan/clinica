import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["dist/**", "node_modules/**"]
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  prettier,

  {
    files: ["**/*.ts"],

    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json"
      }
    },

    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn"

    //   Rules for later 
    // "@typescript-eslint/consistent-type-imports": "error",
    // "@typescript-eslint/no-floating-promises": "error",
    // "@typescript-eslint/explicit-function-return-type": "off"
    }
  }
];