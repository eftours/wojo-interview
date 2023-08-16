import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RoomingList, SelectTravelers } from "@app/components";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

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
        marginTop: 128,
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: "#fff",
    },
});
