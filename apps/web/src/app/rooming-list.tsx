"use client";
import { SetStateAction } from "react";
import { BedCode, useBookRoomMutation, useRoomCombinationsQuery } from "../../generated";
import pluralize from "pluralize";
import { RadioGroup } from "../components";

export type RoomingListProps = {
    nbTravelers: number;
    selection: string | undefined;
    setSelection: React.Dispatch<SetStateAction<string | undefined>>;
    tourCode?: string;
};
export const RoomingList: React.FC<RoomingListProps> = ({ nbTravelers, selection, setSelection, tourCode }) => {
    const [book] = useBookRoomMutation({
        onCompleted: () => window.location.reload(),
    });
    const { data, error, loading } = useRoomCombinationsQuery({
        variables: {
            nbTravelers,
            tourCode: tourCode ?? "",
        },
        skip: nbTravelers < 1 || nbTravelers > 5 || !tourCode,
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
        <>
            <RadioGroup
                items={data.roomCombinations.map((combos) => {
                    const combination = combos.reduce((prev, curr) => {
                        return `${prev ? `${prev}, ` : prev} ${curr.count} ${curr.room.name} ${pluralize(
                            "room",
                            curr.count
                        )} with availability of ${curr.room.roomInventory.availability}`;
                    }, "");
                    return { label: combination, value: combination };
                })}
                onChange={(e) => setSelection(e.target.value)}
                value={selection}
                labelText={`Select your ${pluralize("room", nbTravelers)}:`}
            />
            <button
                onClick={async () => {
                    const combinations = selection?.split(",");
                    const roomCodes = Object.keys(BedCode)
                        .filter((k) => combinations?.some((combo) => combo.includes(k)))
                        .map((code) => code.toLowerCase());

                    const rooms = roomCodes.map((code) => {
                        const room = data?.roomCombinations?.find((combos) =>
                            combos.some((combo) => combo.room.bedCode.toLowerCase() === code)
                        );
                        return room?.find((combo) => combo.room.bedCode.toLowerCase() === code)?.room;
                    });
                    for (const room of rooms ?? []) {
                        await book({
                            variables: {
                                _id: room?._id,
                            },
                        });
                    }
                }}
                style={{ padding: "4px 32px", marginTop: 16 }}
            >
                Book
            </button>
        </>
    );
};
