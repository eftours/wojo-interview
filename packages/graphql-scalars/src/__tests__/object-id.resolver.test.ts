import { ObjectId } from "mongodb";
import { ObjectIdResolver } from "../object-id.resolver";
import { Kind } from "graphql";
describe("ObjectIdResolver", () => {
    it("can serialize a valid ObjectId", () => {
        const id = new ObjectId();
        const result = ObjectIdResolver.serialize(id);
        expect(result).toEqual(id.toHexString());
    });

    it("throws an error when serializing an invalid ObjectId", () => {
        const id = "123";
        expect(() => ObjectIdResolver.serialize(id)).toThrowError("Invalid ObjectId");
    });

    it("can parse a valid ObjectId hex string", () => {
        const id = new ObjectId();
        const result = ObjectIdResolver.parseValue(id.toHexString());
        expect(result).toEqual(id);
    });

    it("throws an error when parsing an invalid ObjectId hex string", () => {
        const id = new ObjectId();
        expect(() => ObjectIdResolver.parseValue(id)).toThrowError("Invalid hex string");
    });

    it("can parse literal hex string", () => {
        const id = new ObjectId();
        const result = ObjectIdResolver.parseLiteral({ kind: Kind.STRING, value: id.toHexString() });
        expect(result).toEqual(id);
    });
});
