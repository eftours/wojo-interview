import { ApolloServer } from "@apollo/server";
import gql from "graphql-tag";
import { MongoMemoryServer } from "mongodb-memory-server";
import assert from "node:assert";
import { Db } from "../db/client";
import { rooms } from "../db/seed.data";
import { Context, schema } from "../schema";

describe("query room combinations", () => {
    let mongoServer: MongoMemoryServer;
    let db: Db;
    let server: ApolloServer<Context>;
    beforeAll(async () => {
        server = new ApolloServer<Context>({ schema });
        mongoServer = await MongoMemoryServer.create();
        db = new Db(mongoServer.getUri());
        await db.init();
        await db.room.insertMany(
            rooms.map((room) => ({
                ...room,
                createdAt: new Date(),
                updatedAt: new Date(),
            }))
        );
    });
    afterAll(async () => {
        await db.reset();
        await db.close();
        await mongoServer.stop();
    });
    it("should return valid room combinations", async () => {
        const res = await server.executeOperation(
            {
                query: gql`
                    query RoomCombinations($nbTravelers: Int!) {
                        roomCombinations(nbTravelers: $nbTravelers) {
                            __typename
                            count
                            room {
                                _id
                                name
                                capacity
                                description
                                price
                            }
                        }
                    }
                `,
                variables: {
                    nbTravelers: 5,
                },
            },
            {
                contextValue: {
                    db,
                },
            }
        );

        assert(res.body.kind === "single");
        expect(res.body.singleResult.errors).toBeUndefined();
        expect(res.body.singleResult.data?.roomCombinations).toHaveLength(6);
    });

    it("should not return room combinations with more than 5 travelers", async () => {
        const res = await server.executeOperation(
            {
                query: gql`
                    query RoomCombinations($nbTravelers: Int!) {
                        roomCombinations(nbTravelers: $nbTravelers) {
                            __typename
                            count
                            room {
                                _id
                                name
                                capacity
                                description
                                price
                            }
                        }
                    }
                `,
                variables: {
                    nbTravelers: 100,
                },
            },
            {
                contextValue: {
                    db,
                },
            }
        );

        assert(res.body.kind === "single");
        expect(res.body.singleResult.errors).toBeUndefined();
        expect(res.body.singleResult.data?.roomCombinations).toHaveLength(0);
    });
});
