export type SelectProps = {
    value: string | number;
    items: { label: string; value: string | number }[];
    onChange?: (value: string) => void;
    labelText?: string;
};

export const Select: React.FC<SelectProps> = ({ items, onChange, value, labelText }) => {
    return (
        <>
            {labelText ? <label style={{ marginRight: 8, fontWeight: 500 }}>{labelText}</label> : null}
            <select
                style={{ padding: "4px 16px 4px 8px", cursor: "pointer", borderRadius: 4, width: 64 }}
                onChange={(e) => onChange?.(e.target.value)}
                value={value}
            >
                {items.map((item, index) => {
                    return (
                        <option value={item.value} key={`${index}-${item.value}`}>
                            {item.label}
                        </option>
                    );
                })}
            </select>
        </>
    );
};
