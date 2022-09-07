/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    daisyui: {
        themes: ["business", "corporate"],
    },
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },


    plugins: [require('@tailwindcss/forms'), require("daisyui")]
}
