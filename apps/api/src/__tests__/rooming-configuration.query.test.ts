import { ApolloServer } from "@apollo/server";
import gql from "graphql-tag";
import { MongoMemoryServer } from "mongodb-memory-server";
import assert from "node:assert";
import { Db } from "../db/client";
import { rooms } from "../db/seed.data";
import { Context, schema } from "../schema";

describe("query rooming configuration", () => {
    let mongoServer: MongoMemoryServer;
    let db: Db;
    let server: ApolloServer<Context>;
    beforeAll(async () => {
        server = new ApolloServer<Context>({ schema });
        mongoServer = await MongoMemoryServer.create();
        db = new Db(mongoServer.getUri());
        await db.init();
    });
    beforeEach(async () => {
        await db.reset();
    });
    afterAll(async () => {
        await db.close();
        await mongoServer.stop();
    });
    it("should return rooming configuration", async () => {
        await db.roomConfiguration.insertMany(
            rooms.map((room) => ({
                ...room,
                createdAt: new Date(),
                updatedAt: new Date(),
            }))
        );
        const res = await server.executeOperation(
            {
                query: gql`
                    query RoomingConfiguration {
                        roomingConfiguration {
                            __typename
                            bedCode
                            name
                            description
                            price
                        }
                    }
                `,
            },
            {
                contextValue: {
                    db,
                },
            }
        );
        assert(res.body.kind === "single");
        expect(res.body.singleResult.errors).toBeUndefined();
        expect(res.body.singleResult.data?.roomingConfiguration).toHaveLength(4);
    });
});
