import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import { Db } from "./db/client";
import { DateResolver, DateTimeResolver, ObjectIdResolver } from "@wojo/graphql-scalars";
import { Resolvers } from "../generated";
import { BedCode, DbRoom } from "./db/room.model";
import { WithId } from "mongodb";

export type Context = {
    db: Db;
};

const typeDefs = gql`
    extend schema
        @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@extends", "@requires", "@key", "@external"])
    scalar DateTime
    scalar Date
    scalar ObjectId

    extend type Query {
        ## Get all possible room configurations available to book
        roomCombinations(nbTravelers: Int!): [[RoomCombinations!]!]
    }
    type Room {
        _id: ObjectId!
        ## The number of people who can stay in the room
        capacity: Int!
        ## The type of bed in the room (e.g. single, DOUBLE, etc.)
        bedCode: BedCode!
        ## The price of the room per night
        price: Int!
        ## The name of the room as displayed on the website
        name: String!
        ## The description of the room
        description: String!
    }

    enum BedCode {
        SINGLE
        DOUBLE
        TRIPLE
        QUAD
    }

    type RoomCombinations {
        ## The number of rooms
        count: Int!
        ## The room configuration
        room: Room!
    }
`;

const resolvers: Resolvers<Context> = {
    Query: {
        async roomCombinations(_, { nbTravelers }, { db }) {
            const configs: Record<string, number>[][] = [
                [],
                [{ [BedCode.SINGLE]: 1 }],
                [{ [BedCode.SINGLE]: 2 }, { [BedCode.DOUBLE]: 1 }],
                [{ [BedCode.SINGLE]: 3 }, { [BedCode.SINGLE]: 1, [BedCode.DOUBLE]: 1 }, { [BedCode.TRIPLE]: 1 }],
                [
                    { [BedCode.SINGLE]: 4 },
                    { [BedCode.SINGLE]: 2, [BedCode.DOUBLE]: 1 },
                    { [BedCode.DOUBLE]: 2 },
                    { [BedCode.TRIPLE]: 1, [BedCode.SINGLE]: 1 },
                    { [BedCode.QUAD]: 1 },
                ],
                [
                    { [BedCode.SINGLE]: 5 },
                    { [BedCode.SINGLE]: 3, [BedCode.DOUBLE]: 1 },
                    { [BedCode.DOUBLE]: 2, [BedCode.SINGLE]: 1 },
                    { [BedCode.TRIPLE]: 1, [BedCode.DOUBLE]: 1 },
                    { [BedCode.TRIPLE]: 1, [BedCode.SINGLE]: 2 },
                    { [BedCode.QUAD]: 1, [BedCode.SINGLE]: 1 },
                ],
            ];
            const rooms = await db.room.find().toArray();
            const combinations = configs[nbTravelers];
            return (
                combinations?.map((combination) =>
                    Object.keys(combination).reduce<{ count: number; room: WithId<DbRoom> }[]>((prev, curr) => {
                        const count = combination[curr];
                        const room = rooms?.find((room: DbRoom) => room.bedCode === curr);
                        return room ? [...prev, { count, room }] : prev;
                    }, [])
                ) ?? []
            );
        },
    },
    DateTime: DateTimeResolver,
    Date: DateResolver,
    ObjectId: ObjectIdResolver,
};

export const schema = buildSubgraphSchema([
    {
        typeDefs,
        resolvers,
    },
]);
