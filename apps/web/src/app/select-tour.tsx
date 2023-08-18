"use client";
import { useToursQuery } from "../../generated";
import { Select } from "../components";

export type SelectTourProps = {
    tourCode: any;
    setTourCode: any;
};
export const SelectTour: React.FC<SelectTourProps> = ({ tourCode, setTourCode }) => {
    const { data, error, loading } = useToursQuery();

    if (loading) {
        return null;
    }

    if (error) {
        return <div>There was an error loading the tours</div>;
    }

    return (
        <div style={{ marginBottom: 32 }}>
            <Select
                items={data?.tours?.map((tour) => ({ label: tour.name, value: tour.tourCode })) ?? []}
                labelText="Select a tour"
                value={tourCode}
                onChange={(value) => setTourCode(value)}
            />
        </div>
    );
};
