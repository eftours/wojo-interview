/* eslint-disable no-undef */
module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "turbo", "prettier"],
    rules: {
        eqeqeq: "error",
    },
    overrides: [
        {
            files: ["*"],
            rules: {
                "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],
            },
        },
    ],
};
