const stylistic = require('@stylistic/eslint-plugin');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@stylistic'],
  rules: {
    ...stylistic.configs.customize({
      indent: 2,
      quotes: 'single',
      semi: true,
      jsx: true,
      braceStyle: '1tbs',
    }).rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
