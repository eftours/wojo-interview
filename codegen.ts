import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "apps/api/src/schema.ts",
    documents: "apps/ui/src/**/*.graphql",
    generates: {
        "apps/api/generated.ts": {
            plugins: ["typescript", "typescript-resolvers"],
            config: {
                scalars: {
                    ObjectId: "mongodb#ObjectId",
                    DateTime: "Date",
                    Date: "string",
                },
            },
        },
        "apps/ui/generated.ts": {
            plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
        },
    },
    hooks: {
        afterAllFileWrite: ["prettier --write"],
    },
};

export default config;
