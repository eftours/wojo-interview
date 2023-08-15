import { StyleSheet, TextInput, View } from "react-native";

export type SelectTravelersProps = {
    nbTravelers: any;
    setNbTravelers: any;
};
export const SelectTravelers: React.FC<SelectTravelersProps> = ({ nbTravelers, setNbTravelers }) => {
    return (
        <View style={{ marginBottom: 32 }}>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(nbTravelers)}
                onChangeText={(text) => {
                    const parsedText = text.replace(/[^0-9]/g, "");
                    setNbTravelers(Number(parsedText) || 0);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: "black",
        width: 100,
        padding: 12,
        textAlign: "center",
    },
});
