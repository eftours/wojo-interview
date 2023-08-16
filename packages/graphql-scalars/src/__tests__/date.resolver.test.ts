import { Kind } from "graphql";
import { DateResolver } from "../date.resolver";

describe("DateResolver", () => {
    it("can serialize a date", () => {
        const value = DateResolver.serialize(new Date("2021-01-01T00:00:00.000Z"));
        expect(value).toEqual("2021-01-01");
    });

    it("can serialize an iso date string", () => {
        const value = DateResolver.serialize("2021-01-01T00:00:00.000Z");
        expect(value).toEqual("2021-01-01");
    });

    it("can serialize a date only string", () => {
        const value = DateResolver.serialize("2021-01-01");
        expect(value).toEqual("2021-01-01");
    });

    it("throws error to serialize non date or string types", () => {
        const value = () => DateResolver.serialize(1);
        expect(value).toThrowError("Value must be a date or string");
    });

    it("can parse string value", () => {
        const value = DateResolver.parseValue("2021-01-01T00:00:00.000Z");
        expect(value).toEqual("2021-01-01");
    });

    it("can parse a est string value", () => {
        const value = DateResolver.parseValue("2021-01-01T00:00:00.000-05:00");
        expect(value).toEqual("2021-01-01");
    });

    it("throws error on non date string value", () => {
        const value = () => DateResolver.parseValue(new Date());
        expect(value).toThrowError("Invalid Date");
    });

    it("throws error on non date string formatted string", () => {
        const value = () => DateResolver.parseValue("abcd-ef-gh:T00:00:00.000Z");
        expect(value).toThrowError("Invalid Date");
    });

    it("can parse literal", () => {
        const value = DateResolver.parseLiteral({ kind: Kind.STRING, value: "2021-01-01T00:00:00.000Z" });
        expect(value).toEqual("2021-01-01");
    });

    it("can parse literal date only string", () => {
        const value = DateResolver.parseLiteral({ kind: Kind.STRING, value: "2021-01-01" });
        expect(value).toEqual("2021-01-01");
    });

    it("throws error on non date formatted string literal", () => {
        const value = () => DateResolver.parseLiteral({ kind: Kind.STRING, value: "abcd-ef-gh:T00:00:00.000Z" });
        expect(value).toThrowError("Invalid Date");
    });

    it("throw error on non string literal", () => {
        const value = () => DateResolver.parseLiteral({ kind: Kind.INT, value: "2021-01-01" });
        expect(value).toThrowError("Invalid Date");
    });
});
