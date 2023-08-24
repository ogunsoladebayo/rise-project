module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "typescript",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-unused-vars": "error",
    "no-console": "error",
    "prettier/prettier": [
      "error",
      {
        "object-curly-spacing": "always",
      },
    ],
  },
};
