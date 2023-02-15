/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/@cn-ui/core/dist/**',
    './node_modules/@cn-ui/core/src/**',],
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
