"use client";
import { useState } from "react";
import { RoomingList } from "../components/RoomingList";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SelectTravelers } from "../components/SelectTravelers";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

export default function Home() {
    const [nbTravelers, setNbTravelers] = useState(2);
    return (
        <ApolloProvider client={client}>
            <SelectTravelers nbTravelers={nbTravelers} setNbTravelers={setNbTravelers} />
            <RoomingList nbTravelers={nbTravelers} />
        </ApolloProvider>
    );
}
