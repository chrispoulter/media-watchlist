import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export const config = defineConfig(
  {
    ignores: ['**/dist/**', '**/build/**', '**/node_modules/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // Config/tooling files aren't part of any tsconfig's `include` — disable type-aware rules for them
  {
    files: ['**/*.config.{js,cjs,mjs,ts}'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // Must be last: turns off all ESLint stylistic rules that would conflict with Prettier
  eslintConfigPrettier,
);
