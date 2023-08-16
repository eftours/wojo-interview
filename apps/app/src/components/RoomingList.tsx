"use client";
import { useRoomCombinationsQuery } from "generated";
import pluralize from "pluralize";
import { Text, View } from "react-native";

export type RoomingListProps = {
    nbTravelers: number;
};
export const RoomingList: React.FC<RoomingListProps> = ({ nbTravelers }) => {
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
        console.log({ error });
        return <Text>There was an error loading the rooms.</Text>;
    }
    if (!data?.roomCombinations?.length) {
        return <Text>{`There are no rooms for ${nbTravelers} ${pluralize("traveler", nbTravelers)}`}</Text>;
    }
    console.log({ data }, data.roomCombinations);
    return (
        <View data-testid="rooming-list" style={{ marginTop: 32 }}>
            {data.roomCombinations.map((combos, index) => {
                const combination = combos.reduce((prev, curr) => {
                    return `${prev ? `${prev}, ` : prev} ${curr.count} ${curr.room.name} ${pluralize(
                        "room",
                        curr.count
                    )}`;
                }, "");
                console.log({ combination, combos });
                return <Text key={index}>{combination}</Text>;
            })}
        </View>
    );
};
