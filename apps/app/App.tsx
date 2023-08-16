import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RoomingList } from "./src/app/rooming-list";
import { SelectTravelers } from "./src/app/select-travelers";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

export default function Home() {
    const [nbTravelers, setNbTravelers] = useState(2);
    return (
        <ApolloProvider client={client}>
            <View style={styles.container}>
                <SelectTravelers nbTravelers={nbTravelers} setNbTravelers={setNbTravelers} />
                <RoomingList nbTravelers={nbTravelers} />
                <StatusBar style="auto" />
            </View>
        </ApolloProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: "75%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
