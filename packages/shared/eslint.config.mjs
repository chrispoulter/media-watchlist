import { defineConfig } from 'eslint/config';
import { config as baseConfig } from '@media-watchlist/eslint-config/base';

export default defineConfig(
  // Must come before `...baseConfig` so its `**/*.config.*` override (which strips
  // type-aware parsing for this file itself) applies last.
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  ...baseConfig,
);
