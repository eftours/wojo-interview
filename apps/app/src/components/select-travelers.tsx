import { Dispatch, SetStateAction } from "react";
import { Select } from ".";

export type SelectTravelersProps = {
    nbTravelers: number;
    setNbTravelers: Dispatch<SetStateAction<number>>;
};
export const SelectTravelers: React.FC<SelectTravelersProps> = ({ nbTravelers, setNbTravelers }) => {
    return (
        <Select
            value={nbTravelers}
            onChange={setNbTravelers}
            items={Array.from({ length: 5 }).map((item, index) => ({
                value: index + 1,
                label: String(index + 1),
            }))}
            labelText="How many travelers?"
        />
    );
};
