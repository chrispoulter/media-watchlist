import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { config as baseConfig } from '@media-watchlist/eslint-config/base';

export default defineConfig(
  // Must come before `...baseConfig` so its `**/*.config.*` override (which strips
  // type-aware parsing for files like this one and drizzle.config.ts) applies last.
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  ...baseConfig,
);
