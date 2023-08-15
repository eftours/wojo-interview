import { TextInput, View } from "react-native";

export type SelectTravelersProps = {
    nbTravelers: any;
    setNbTravelers: any;
};
export const SelectTravelers: React.FC<SelectTravelersProps> = ({ nbTravelers, setNbTravelers }) => {
    return (
        <View style={{ marginBottom: 32 }}>
            <TextInput
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
