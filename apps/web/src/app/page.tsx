"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useEffect, useState } from "react";
import { RoomingList } from "./rooming-list";
import { Selection } from "./selection";
import { SelectTravelers } from "./select-travelers";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

export default function Home() {
    const [nbTravelers, setNbTravelers] = useState(2);
    const [selection, setSelection] = useState<string | undefined>(undefined);
    useEffect(() => {
        setSelection(undefined);
    }, [nbTravelers]);
    return (
        <ApolloProvider client={client}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <SelectTravelers nbTravelers={nbTravelers} setNbTravelers={setNbTravelers} />
                <Selection selection={selection} />
            </div>
            <RoomingList nbTravelers={nbTravelers} selection={selection} setSelection={setSelection} />
        </ApolloProvider>
    );
}
