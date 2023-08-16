import { useRoomCombinationsQuery } from "generated";
import pluralize from "pluralize";
import { StyleSheet, Text, View } from "react-native";
import { RadioGroup } from "./radio-group";

export type RoomingListProps = {
    nbTravelers: number;
    selectedId: string;
    setSelection: React.Dispatch<React.SetStateAction<string>>;
};
export const RoomingList: React.FC<RoomingListProps> = ({ nbTravelers, selectedId, setSelection }) => {
    const { data, error, loading } = useRoomCombinationsQuery({
        variables: {
            nbTravelers,
        },
        skip: nbTravelers < 1 || nbTravelers > 5,
    });
    if (loading) {
        return <Text>loading...</Text>;
    }
    if (error) {
        return <Text>There was an error loading the rooms.</Text>;
    }
    if (!data?.roomCombinations?.length) {
        return <Text>{`There are no rooms for ${nbTravelers} ${pluralize("traveler", nbTravelers)}`}</Text>;
    }
    const items = data.roomCombinations.map((combos, index) => {
        const combination = combos.reduce((prev, curr) => {
            return `${prev ? `${prev}, ` : prev} ${curr.count} ${curr.room.name} ${pluralize("room", curr.count)}`;
        }, "");
        return { id: combination, label: combination, value: combination };
    });
    return (
        <View data-testid="rooming-list" style={styles.container}>
            <RadioGroup items={items} selectedId={selectedId} onChange={setSelection} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
});
