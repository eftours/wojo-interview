import { StyleSheet, Text } from "react-native";

export type SelectionProps = {
    selection?: string;
};
export const Selection: React.FC<SelectionProps> = ({ selection }) => {
    if (!selection) {
        return null;
    }
    return <Text style={styles.text}>Selected: {selection}</Text>;
};

const styles = StyleSheet.create({
    text: {
        marginBottom: 32,
    },
});
