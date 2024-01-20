let config = {
  env: {
    node: true,
    commonjs: true,
    jest : true,
  },
  extends: ["eslint:recommended", "plugin:node/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "node/no-unpublished-require": "error",
    "no-process-exit": "off"
  },
  plugins: ["prettier", "jest"],
  ignorePatterns: ["front-end", ".eslintrc.js, teardown.js"],
};
module.exports = config;
