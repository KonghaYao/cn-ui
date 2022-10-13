/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./{src,story,package}/**/*.{ts,tsx,less}'],
    theme: {
        extend: {},
    },
    mode: 'jit',
    plugins: [require('@tailwindcss/line-clamp')],
};
