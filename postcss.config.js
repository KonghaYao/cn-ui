module.exports = {
    // purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-import': {
            filter(item) {
                return;
            },
        },
    },
};
