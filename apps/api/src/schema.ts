import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import { Db } from "./db/client";
import { DateResolver, DateTimeResolver, ObjectIdResolver } from "@wojo/graphql-scalars";
import { Resolvers } from "../generated";

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
        roomingConfiguration: [RoomConfiguration!]
    }
    type RoomConfiguration {
        _id: ObjectId!
        ## The number of people who can stay in the room
        capacity: Int!
        ## The type of bed in the room (e.g. single, double, etc.)
        bedCode: String!
        ## The price of the room per night
        price: Int!
        ## The name of the room as displayed on the website
        name: String!
        ## The description of the room
        description: String!
    }
`;

const resolvers: Resolvers = {
    Query: {
        roomingConfiguration(_, __, ctx) {
            return ctx.db.roomConfiguration.find().toArray();
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
