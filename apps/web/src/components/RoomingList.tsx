"use client";
import pluralize from "pluralize";
import { useRoomingConfigurationQuery } from "../../generated";

type Combination = {
    S?: number;
    D?: number;
    F?: number;
    Q?: number;
};

type Config = Combination[][];

const configs: Config = [
    [],
    [{ S: 1 }],
    [{ S: 2 }, { D: 1 }],
    [{ S: 3 }, { S: 1, D: 1 }, { F: 1 }],
    [{ S: 4 }, { S: 2, D: 1 }, { D: 2 }, { F: 1, S: 1 }, { Q: 1 }],
    [{ S: 5 }, { S: 3, D: 1 }, { D: 2, S: 1 }, { F: 1, D: 1 }, { F: 1, S: 2 }, { Q: 1, S: 1 }],
];

export type RoomingListProps = {
    nbTravelers: number;
};
export const RoomingList: React.FC<RoomingListProps> = ({ nbTravelers }) => {
    const { data, error, loading } = useRoomingConfigurationQuery();
    const config = configs[nbTravelers] as Combination[];
    if (loading) {
        return <div>loading...</div>;
    }
    if (error) {
        return <div>There was an error loading the rooms.</div>;
    }
    if (!config) {
        return <div>{`There are no rooms for ${nbTravelers} ${pluralize("traveler", nbTravelers)}`}</div>;
    }
    return (
        <ul data-testid="rooming-list" style={{ marginTop: 32 }}>
            {config.map((combo, index) => {
                const x = Object.keys(combo).reduce((prev, curr) => {
                    const count = combo[curr as keyof Combination];
                    const match = data?.roomingConfiguration?.find((room) => room.bedCode === curr);
                    if (!match) {
                        return prev;
                    }
                    return `${prev} ${count} ${match.name} ${pluralize("room", count)}`;
                }, "");
                return <div key={index}>{x}</div>;
            })}
        </ul>
    );
};
