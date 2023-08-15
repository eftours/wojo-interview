import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RoomingList } from "./src/components/RoomingList";
import { SelectTravelers } from "./src/components/SelectTravelers";

// const getClient = (ip: string) => {
//     return new ApolloClient({
//         // uri: `${ip}:4000/graphql`,
//         uri: `http://10.0.2.16:4000/graphql`,
//         cache: new InMemoryCache(),
//     });
// };

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

export default function Home() {
    const [nbTravelers, setNbTravelers] = useState(2);
    // const [client, setClient] = useState<any>();

    // useEffect(() => {
    //     if (client) return;
    //     const getIp = async () => {
    //         const ip = await Network.getIpAddressAsync();
    //         console.log({ ip }, Platform.OS);
    //         setClient(getClient(ip));
    //     };
    //     getIp();
    // });

    // if (!client) {
    //     return <Text>...loading</Text>;
    // }

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
