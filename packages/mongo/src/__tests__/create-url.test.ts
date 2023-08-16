import { createUrl } from "../db-client";

describe("createUrl", () => {
    it("should create a valid mongo url", () => {
        const url = createUrl({
            mongoDb: "test",
            mongoPassword: "test",
            mongoUrl: "test",
            mongoUser: "test",
        });
        expect(url).toBe("mongodb+srv://test:test@test/test?retryWrites=true&w=majority");
    });
});
