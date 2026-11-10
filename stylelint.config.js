export default {
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-idiomatic-order',
        'stylelint-config-tailwindcss',
    ],
    plugins: ['stylelint-prettier'],
    rules: {
        'at-rule-no-deprecated': null,
        'no-descending-specificity': null,
        'prettier/prettier': [true, { singleQuote: false }],
    },
}
