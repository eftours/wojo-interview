"use client";
import { useState } from "react";
import { RoomingList } from "../components/RoomingList";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SelectTour } from "../components/SelectTour";
import { SelectTravelers } from "../components/SelectTravelers";
import { RoomConfiguration, Tour } from "../../generated";
import { SelectRooms } from "../components/SelectRooms";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

export default function Home() {
    const [nbTravelers, setNbTravelers] = useState(2);
    const [tour, setTour] = useState<Tour | undefined>(undefined);
    const [rooms, setRooms] = useState<RoomConfiguration[]>([]);
    return (
        <ApolloProvider client={client}>
            <SelectTour tour={tour} setTour={setTour} />
            <SelectTravelers nbTravelers={nbTravelers} setNbTravelers={setNbTravelers} />
            <RoomingList nbTravelers={nbTravelers} tourCode={tour?.tourCode} setRooms={setRooms} />
            <SelectRooms rooms={rooms} />
        </ApolloProvider>
    );
}
