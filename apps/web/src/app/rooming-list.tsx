"use client";
import pluralize from "pluralize";
import { SetStateAction } from "react";
import { useRoomCombinationsQuery } from "../../generated";
import { RadioGroup } from "../components";

export type RoomingListProps = {
    nbTravelers: number;
    selection: string | undefined;
    setSelection: React.Dispatch<SetStateAction<string | undefined>>;
};
export const RoomingList: React.FC<RoomingListProps> = ({ nbTravelers, selection, setSelection }) => {
    const { data, error, loading } = useRoomCombinationsQuery({
        variables: {
            nbTravelers,
        },
        skip: nbTravelers < 1 || nbTravelers > 5,
    });
    if (loading) {
        return null;
    }
    if (error) {
        return <div>There was an error loading the rooms.</div>;
    }
    if (!data?.roomCombinations?.length) {
        return <div>{`There are no rooms for ${nbTravelers} ${pluralize("traveler", nbTravelers)}`}</div>;
    }
    return (
        <RadioGroup
            items={data.roomCombinations.map((combos) => {
                const combination = combos.reduce((prev, curr) => {
                    return `${prev ? `${prev}, ` : prev} ${curr.count} ${curr.room.name} ${pluralize(
                        "room",
                        curr.count
                    )}`;
                }, "");
                console.log({ combination });
                return { label: combination, value: combination };
            })}
            onChange={(e) => setSelection(e.target.value)}
            value={selection}
            labelText={`Select your ${pluralize("room", nbTravelers)}:`}
        />
    );
};
