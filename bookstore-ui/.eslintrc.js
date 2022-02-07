// eslint-disable-next-line no-undef
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'prettier',
    ],
    plugins: ['simple-import-sort', 'import', 'prettier'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 0,
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'react/no-children-prop': 0,
        'no-console': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        quotes: [2, 'single', { avoidEscape: true }],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        browser: true,
        es2021: true,
    },
};
