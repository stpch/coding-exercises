import js from '@eslint/js'
import perfectionist from 'eslint-plugin-perfectionist'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig } from 'eslint/config'
import tsEslint from 'typescript-eslint'

export default defineConfig([
    { ignores: ['dist'] },
    {
        extends: [
            js.configs.recommended,
            tsEslint.configs.recommended,
            reactPlugin.configs.flat.recommended,
            reactHooks.configs.flat['recommended-latest'],
            perfectionist.configs['recommended-natural'],
            prettierRecommended,
        ],
        files: ['**/*.{js,ts,tsx}'],
        plugins: { 'react-refresh': reactRefresh },
        rules: {
            '@typescript-eslint/ban-ts-comment': [
                'error',
                { 'ts-check': true, 'ts-expect-error': false },
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                    varsIgnorePattern: '^_',
                },
            ],
            'perfectionist/sort-imports': [
                'error',
                { newlinesBetween: 0, type: 'natural' },
            ],
            'perfectionist/sort-jsx-props': [
                'error',
                {
                    customGroups: [
                        {
                            elementNamePattern: '^(?:key|ref)$',
                            groupName: 'reserved',
                        },
                    ],
                    groups: ['reserved', 'prop', 'shorthand-prop'],
                    type: 'natural',
                },
            ],
            'perfectionist/sort-modules': 'off',
            'react-hooks/exhaustive-deps': 'error',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'react/display-name': 'off',
            'react/jsx-boolean-value': ['error', 'never'],
            'react/jsx-no-bind': 'off',
            'react/jsx-no-target-blank': 'off',
            'react/react-in-jsx-scope': 'off',
        },
        settings: { react: { version: 'detect' } },
    },
])
