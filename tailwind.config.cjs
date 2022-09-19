/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    daisyui: {
        themes: ["business", "corporate"],
    },
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        './node_modules/tw-elements/dist/js/**/*.js',
    ],
    theme: {
        extend: {},
    },


    plugins: [
        require('@tailwindcss/forms'),
        require("daisyui"),
        require('tw-elements/dist/plugin'),
    ]
}
