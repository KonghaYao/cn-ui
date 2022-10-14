/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./{src,story}/**/*.{ts,tsx,less}'],
    theme: {
        extend: {},
    },
    mode: 'jit',
    plugins: [require('@tailwindcss/line-clamp')],
};
