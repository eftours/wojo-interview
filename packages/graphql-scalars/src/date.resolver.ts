import dayjs from "dayjs";
import { ASTNode, GraphQLScalarType, Kind } from "graphql";
import utc from "dayjs/plugin/utc";
import { isValidDateString } from "./is-valid-date-string";

dayjs.extend(utc);

export const DateResolver = new GraphQLScalarType({
    name: "Date",
    description: "Date",
    serialize(value) {
        if (value instanceof Date) {
            return dayjs.utc(value, "YYYY-MM-DD").format("YYYY-MM-DD");
        } else if (isValidDateString(value)) {
            return value.substring(0, 10);
        }
        throw new Error("Value must be a date or string");
    },
    parseValue(value: unknown) {
        if (isValidDateString(value)) {
            return value.substring(0, 10);
        }
        throw new Error("Invalid Date");
    },
    parseLiteral(ast: ASTNode) {
        if (ast.kind === Kind.STRING && isValidDateString(ast.value)) {
            return ast.value.substring(0, 10);
        }
        throw new Error("Invalid Date");
    },
});
