import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import baseConfig from '@hono/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import("eslint").Linter.Config} */
export const config = defineConfig(globalIgnores(['dist']), {
    files: ['**/*.{ts,tsx}'],
    extends: [
        baseConfig,
        js.configs.recommended,
        tseslint.configs.recommended,
        eslintConfigPrettier,
    ],
    languageOptions: {
        globals: globals.node,
        parserOptions: {
            projectService: true,
        },
    },
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_' },
        ],
    },
});
