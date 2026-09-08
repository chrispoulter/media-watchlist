// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/coverage/**',
      'packages/ui/public/**',
      'packages/ui/scripts/**',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Node/Express globals for the API package
  {
    files: ['packages/api/**/*.ts'],
    languageOptions: { globals: globals.node },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // Browser + React-specific rules for the UI package
  {
    files: ['packages/ui/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // react-hook-form's handleSubmit() returns a Promise-returning handler that's
      // idiomatically passed straight to onSubmit={...}; React ignores the return value.
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
    },
  },

  // Config/tooling files aren't part of any tsconfig's `include` — disable type-aware rules for them
  {
    files: ['**/*.config.{js,cjs,mjs,ts}'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // Must be last: turns off all ESLint stylistic rules that would conflict with Prettier
  eslintConfigPrettier,
);
