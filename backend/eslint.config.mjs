import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';

export default {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    eslintPluginPrettierRecommended,
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  globals: {
    ...globals.node,
    ...globals.jest,
  },
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
  },
  ignorePatterns: ['eslint.config.mjs'],
};
