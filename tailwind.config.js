/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                darkbg: '#0a0a0a',
                cardbg: '#171717',
                brandBlue: '#0ea5e9',
                brandYellow: '#eab308',
                brandGreen: '#22c55e',
                brandPurple: '#a855f7',
            }
        },
    },
    plugins: [],
}