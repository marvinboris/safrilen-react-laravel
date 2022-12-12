/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const svgToDataUri = require('mini-svg-data-uri')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

module.exports = {
    content: [
        "./node_modules/flowbite-react/**/*.js",
        "./resources/ts/src/pages/**/*.{js,ts,jsx,tsx}",
        "./resources/ts/src/components/**/*.{js,ts,jsx,tsx}",
        "./resources/ts/src/features/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Display', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: '#283890',
                secondary: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#5A657D',
                    700: '#4A5568',
                    800: '#262626',
                    900: '#171717',
                },
                blue: '#2129EE',
                sky: '#0590DE',
                night: '#2E5C9E',
                green: '#70a334',
                orange: '#F59C1C',
                red: '#dc3545',
                yellow: '#FDAF17',
            }
        },
    },
    plugins: [
        function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'bg-grid': (value) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                        )}")`,
                    }),
                },
                { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
            )

            matchUtilities(
                {
                    highlight: (value) => ({ boxShadow: `inset 0 1px 0 0 ${value}` }),
                },
                { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
            )
        },
        require('@tailwindcss/line-clamp'),
        require("flowbite/plugin")
    ],
}
