let config = {
  env: {
    es6: true,
    node: true,
    jest : true
  },
  extends: ["eslint:recommended", "plugin:node/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "node/no-unpublished-require": "error"
  },
  plugins: ["prettier", "jest"],
  ignorePatterns: ["front-end", ".eslintrc.js"],
};
module.exports = config;
