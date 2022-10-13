/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./{src,story,package}/**/*.{ts,tsx,less}'],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
