console.log('using postcss config');
module.exports = {
    purge: ['./{src,story,package}/**/*.{ts,tsx}'],
    plugins: {
        'tailwindcss/nesting': 'postcss-nesting',
        tailwindcss: {},
        autoprefixer: {},
        'postcss-nesting': {},
        'postcss-preset-env': {
            features: { 'nesting-rules': true },
        },
    },
};
