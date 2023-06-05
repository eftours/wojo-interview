import { ASTNode, GraphQLScalarType, Kind } from "graphql";
import { ObjectId } from "mongodb";

export const ObjectIdResolver = new GraphQLScalarType({
    name: "ObjectId",
    description: "Mongodb ObjectId",
    serialize(value) {
        if (value instanceof ObjectId) {
            return value.toHexString();
        }
        throw new Error("Invalid ObjectId");
    },
    parseValue(value: unknown) {
        if (typeof value === "string") {
            return ObjectId.createFromHexString(value);
        }
        throw new Error("Invalid hex string");
    },
    parseLiteral(ast: ASTNode) {
        if (ast.kind === Kind.STRING) {
            return ObjectId.createFromHexString(ast.value);
        }
        throw new Error("Invalid hex string");
    },
});
