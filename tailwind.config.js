/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./{src,story}/**/*.{ts,tsx,css,less}'],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
