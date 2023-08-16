import { Kind } from "graphql";
import { DateTimeResolver } from "../date-time.resolver";

describe("DateTimeResolver", () => {
    it("can serialize date", () => {
        const value = DateTimeResolver.serialize(new Date("2021-01-01T00:00:00.000Z"));
        expect(value).toEqual("2021-01-01T00:00:00.000Z");
    });

    it("throws error to serialize non date types", () => {
        const value = () => DateTimeResolver.serialize("2021-01-01T00:00:00.000Z");
        expect(value).toThrowError("Value must be a valid date object");
    });

    it("can parse string value", () => {
        const value = DateTimeResolver.parseValue("2021-01-01T00:00:00.000Z");
        expect(value).toEqual(new Date("2021-01-01T00:00:00.000Z"));
    });

    it("can parse date value", () => {
        const value = DateTimeResolver.parseValue(new Date("2021-01-01T00:00:00.000Z"));
        expect(value).toEqual(new Date("2021-01-01T00:00:00.000Z"));
    });

    it("can parse number value", () => {
        const value = DateTimeResolver.parseValue(1609459200000);
        expect(value).toEqual(new Date("2021-01-01T00:00:00.000Z"));
    });

    it("can parse literal", () => {
        const value = DateTimeResolver.parseLiteral({ kind: Kind.STRING, value: "2021-01-01T00:00:00.000Z" });
        expect(value).toEqual(new Date("2021-01-01T00:00:00.000Z"));
    });
});
