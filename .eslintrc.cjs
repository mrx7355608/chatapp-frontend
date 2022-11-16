module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:react/recommended", "airbnb"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        indent: "off",
        quotes: "off",
        "comma-dangle": "off",
        "react/jsx-indent": "off",
        "react/jsx-indent-props": "off",
        "object-curly-newline": "off",
    },
};
