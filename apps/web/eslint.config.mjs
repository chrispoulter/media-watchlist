import { defineConfig } from 'eslint/config';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { config as baseConfig } from '@media-watchlist/eslint-config/base';

export default defineConfig(
  { ignores: ['public/**', 'scripts/**'] },

  // Must come before `...baseConfig` so its `**/*.config.*` override (which strips
  // type-aware parsing for files like vite.config.ts and this file itself) applies last.
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },
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

  ...baseConfig,
);
