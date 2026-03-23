import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 2018,
    },
  },
]);
