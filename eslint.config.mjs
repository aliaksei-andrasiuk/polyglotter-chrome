import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/.next/**',
            '**/coverage/**',
            '**/_locales/**',
            '**/env/**'
        ]
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true }
            }
        },
        plugins: {
            prettier: prettierPlugin,
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
            import: importPlugin,
        },
        rules: {
            indent: ['error', 4],
            'max-len': ['warn', { code: 120 }],
            'no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 4],
            'react/react-in-jsx-scope': 'off',
            'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
            '@typescript-eslint/no-unused-vars': ['warn'],
            'import/extensions': 'off',
            'import/no-extraneous-dependencies': 'off',
            'prettier/prettier': [
                'error',
                {
                    printWidth: 120,
                    tabWidth: 4,
                    useTabs: false,
                    semi: true,
                    singleQuote: true,
                    trailingComma: 'none'
                }
            ]
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    },

    {
        files: ['webpack.*.js', '*.config.js', 'webpack.*.mjs', '*.config.mjs'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                __dirname: 'readonly',
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly',
                process: 'readonly',
                __filename: 'readonly',
                Buffer: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly'
            }
        },
        rules: {
            'no-undef': 'off',
            '@typescript-eslint/no-require-imports': 'off'
        }
    },

    prettier
];
