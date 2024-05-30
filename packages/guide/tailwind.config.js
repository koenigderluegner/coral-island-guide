const {createGlobPatternsForDependencies} = require('@nx/angular/tailwind');
const {join} = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
    theme: {
        extend: {
            padding: {
                'main-content': 'var(--cg-main-space-vertical) var(--cg-main-space-card-placeholder-width) var(--cg-main-space-vertical) var(--cg-main-space-horizontal)'
            },
            spacing: {
                'main-hz': `var(--cg-main-space-horizontal)`,
                'main-vt': `var(--cg-main-space-vertical)`
            },
            height: {
                main: 'calc(100vh - (var(--cg-min-header-height) + var(--cg-min-footer-height)))'
            },
            maxHeight: {
                main: 'calc(100vh - (var(--cg-min-header-height) + var(--cg-min-footer-height)))'
            },
            maxWidth: {
                'full-safe': 'calc(100vw - (env(safe-area-inset-left) + env(safe-area-inset-right)))'
            },
            fontFamily: {
                'coral': '"QTVagaRound", sans-serif'
            },
            gridTemplateRows: {
                '0fr': '0fr',
                '1fr': '1fr',
            },
            colors: {
                gifting: '#ed7b67',
                accent: '#d89e43',
                merino: {
                    DEFAULT: '#f7f2e8',
                    50: '#faf7f2',
                    100: '#f7f2e8',
                    200: '#e8d9c0',
                    300: '#dabf97',
                    400: '#caa06d',
                    500: '#be8851',
                    600: '#b17445',
                    700: '#935d3b',
                    800: '#774c35',
                    900: '#613f2d',
                    950: '#342016',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography'), require('tailwindcss-safe-area'), require('@tailwindcss/container-queries'),],
};
