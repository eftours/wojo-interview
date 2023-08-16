export type SelectionProps = {
    selection?: string;
};
export const Selection: React.FC<SelectionProps> = ({ selection }) => {
    if (!selection) {
        return null;
    }
    return <p style={{ marginBottom: 32 }}>Selected: {selection}</p>;
};
