export type SelectTravelersProps = {
    nbTravelers: any;
    setNbTravelers: any;
};
export const SelectTravelers: React.FC<SelectTravelersProps> = ({ nbTravelers, setNbTravelers }) => {
    return (
        <div style={{ marginBottom: 32 }}>
            <input type="number" value={nbTravelers} onChange={(e) => setNbTravelers(Number(e.currentTarget.value))} />
        </div>
    );
};
