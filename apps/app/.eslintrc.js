module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        "react-native/react-native": true,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    overrides: [
        {
            parser: "@typescript-eslint/parser",
            files: ["*.ts", "*.tsx", "*.*.tsx"],
        },
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "react-native", "@typescript-eslint", "react-hooks"],
    rules: {
        "react/jsx-no-leaked-render": [
            1,
            { validStrategies: ["coerce", "ternary"] },
        ],
        "react-hooks/rules-of-hooks": "error",
    },
};
