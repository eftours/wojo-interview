export default {
    transform: {
        "^.+\\.ts?$": [
            "ts-jest",
            {
                isolatedModules: true,
            },
        ],
    },
    setupFiles: ["dotenv/config"],
    testEnvironment: "node",
    preset: "ts-jest",
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
};
