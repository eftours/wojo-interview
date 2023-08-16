import { StyleSheet, Text } from "react-native";
import RNRadioGroup from "react-native-radio-buttons-group";

export type RadioGroupProps = {
    items: { id: string; label: string; value: string }[];
    selectedId: string | undefined;
    labelText?: string;
    onChange?: (selectedId: string) => void;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({ items, selectedId, labelText, onChange }) => {
    return (
        <>
            {labelText ? <Text style={styles.label}>{labelText}</Text> : null}
            <RNRadioGroup
                containerStyle={styles.container}
                radioButtons={items}
                selectedId={selectedId}
                onPress={onChange}
            />
        </>
    );
};

const styles = StyleSheet.create({
    label: {
        fontWeight: "500",
        marginBottom: 8,
    },
    container: {
        alignItems: "flex-start",
    },
});
