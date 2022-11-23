/** @type {import('tailwindcss').Config} */
console.log('using tailwindcss config');
module.exports = {
    content: ['./{src,story}/**/*.{ts,tsx}'],
    theme: {
        extend: {},
    },
    mode: 'jit',
    plugins: [require('@tailwindcss/line-clamp')],
};
