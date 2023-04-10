const {createGlobPatternsForDependencies} = require('@nrwl/angular/tailwind');
const {join} = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {
            colors: {
                accent: '#d89e43',
                merino: {
                    DEFAULT: '#f7f2e8',
                    '50': '#faf7f2',
                    '100': '#f7f2e8',
                    '200': '#e8d9c0',
                    '300': '#dabf97',
                    '400': '#caa06d',
                    '500': '#be8851',
                    '600': '#b17445',
                    '700': '#935d3b',
                    '800': '#774c35',
                    '900': '#613f2d',
                    '950': '#342016',
                },

            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwindcss-safe-area')
    ],
};
