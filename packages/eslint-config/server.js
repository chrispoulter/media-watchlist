import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboConfig from 'eslint-config-turbo/flat';

/** @type {import("eslint").Linter.Config} */
export const config = defineConfig(globalIgnores(['dist']), {
    files: ['**/*.{ts,tsx}'],
    extends: [
        turboConfig,
        js.configs.recommended,
        tseslint.configs.recommended,
        eslintConfigPrettier,
    ],
    languageOptions: {
        globals: globals.node,
    },
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_' },
        ],
    },
});
