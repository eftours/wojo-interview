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
        ## Get all possible room configurations available to book for a given tour
        roomingConfiguration(tourCode: String!): [RoomConfiguration!]
        ## Get all tours available to book
        tours: [Tour!]
    }
    extend type Mutation {
        ## Book a room for a given tour
        bookRoom(_id: ObjectId!): Boolean!
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
        ## The tour code of the tour this room configuration is available for
        tourCode: String!
        ## The room inventory for the given room configuration
        roomInventory: RoomInventory!
    }
    type RoomInventory {
        ## The number of rooms available to book
        availability: Int!
    }
    type Tour {
        _id: ObjectId!
        ## The internal code of the tour (e.g. "LPR")
        tourCode: String!
        ## The start date of the tour
        startDate: Date!
        ## The end date of the tour
        endDate: Date!
        ## The name of the tour as displayed on the website
        name: String!
        ## The room configuration possibilities of the tour
        roomingConfiguration: [RoomConfiguration!]
    }
`;

const resolvers: Resolvers = {
    Query: {
        roomingConfiguration(_, __, ctx) {
            return ctx.db.roomConfiguration.find().toArray();
        },
        tours(_, __, ctx) {
            return ctx.db.tour.find().toArray();
        },
    },
    Mutation: {
        async bookRoom(_, { _id }, ctx) {
            try {
                await ctx.db.roomConfiguration.updateOne(
                    { _id },
                    {
                        $inc: {
                            "roomInventory.availability": -1,
                        },
                    }
                );
                return true;
            } catch (e) {
                console.log(e);
                throw new Error("Error booking room");
            }
        },
    },
    Tour: {
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
