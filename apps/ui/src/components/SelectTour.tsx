"use client";
import { useToursQuery } from "../../generated";

export type SelectTourProps = {
    tour: any;
    setTour: any;
};
export const SelectTour: React.FC<SelectTourProps> = ({ tour, setTour }) => {
    const { data, error, loading } = useToursQuery();

    if (loading) {
        return null;
    }

    if (error) {
        return <div>There was an error loading the tours</div>;
    }

    return (
        <div style={{ marginBottom: 32 }}>
            <select
                onChange={(e) => {
                    const selectedTour = data?.tours?.find((tour) => tour._id === e.currentTarget.value);
                    setTour(selectedTour);
                }}
                defaultValue={tour?._id}
            >
                <option disabled selected>
                    Select a tour
                </option>
                {data?.tours?.map((tour) => (
                    <option key={tour._id} value={tour._id}>
                        {tour.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
