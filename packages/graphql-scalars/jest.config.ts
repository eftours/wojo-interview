export default {
    transform: {
        "^.+\\.ts?$": [
            "ts-jest",
            {
                // Don't typecheck tests. We have a separate process for that
                isolatedModules: true,
            },
        ],
    },
    setupFiles: ["dotenv/config"],
    testEnvironment: "node",
    preset: "ts-jest",
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
};
