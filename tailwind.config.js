/** @type {import('tailwindcss').Config} */
console.log('using tailwindcss config');
module.exports = {
    content: ['./{src,story}/**/*.{ts,tsx}', './node_modules/@cn-ui/core/dist/**'],
    theme: {
        extend: {
            boxShadow: {
                suit: '0 4px 11px -2px rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%)',
            },
        },
    },
    mode: 'jit',
    plugins: [require('@tailwindcss/line-clamp')],
};
