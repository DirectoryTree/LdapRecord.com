/** @type {import('prettier').Options} */
module.exports = {
    singleQuote: true,
    semi: true,
    tabWidth: 4,
    plugins: [
        'prettier-plugin-sort-imports',
        'prettier-plugin-tailwindcss',
    ],
    tailwindStylesheet: './src/styles/tailwind.css',
    // Import sorting configuration
    sortingMethod: 'lineLength',
    sortingOrder: 'ascending',
};
