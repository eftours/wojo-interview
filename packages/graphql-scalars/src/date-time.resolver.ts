import dayjs from "dayjs";
import { ASTNode, GraphQLScalarType, Kind } from "graphql";

export const DateTimeResolver = new GraphQLScalarType({
    name: "DateTime",
    description: "DateTime",
    serialize(value) {
        if (value instanceof Date) {
            return dayjs(value).toISOString();
        }
        throw new Error("Value must be a valid date object");
    },
    parseValue(value: unknown) {
        if (value instanceof Date) {
            return dayjs(value).toDate();
        } else if (typeof value === "string") {
            return dayjs(value).toDate();
        } else if (typeof value === "number") {
            return dayjs(value).toDate();
        }
        throw new Error("Invalid DateTime");
    },
    parseLiteral(ast: ASTNode) {
        if (ast.kind === Kind.STRING) {
            return dayjs(ast.value).toDate();
        }
        throw new Error("Invalid DateTime");
    },
});
