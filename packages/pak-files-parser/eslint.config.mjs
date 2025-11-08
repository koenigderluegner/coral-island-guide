import baseConfig from '../../eslint.config.mjs';

export default [
    {
        ignores: ['**/dist'],
    },
    ...baseConfig,
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            'no-case-declarations': 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        // Override or add rules here
        rules: {},
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        // Override or add rules here
        rules: {},
    },
];
