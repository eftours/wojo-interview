import { InputHTMLAttributes } from "react";

export type RadioButtonProps = {
    label: string;
    value: string | number;
} & InputHTMLAttributes<HTMLInputElement>;
export const RadioButton: React.FC<RadioButtonProps> = ({ label, value, ...inputProps }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <input
                id={`${value}`}
                type="radio"
                aria-label="radio-button"
                value={value}
                style={{
                    marginRight: 8,
                    width: 20,
                    height: 20,
                    border: "solid 1px rgba(25, 25, 25, 0.5)",
                    borderRadius: "100%",
                    marginBottom: 4,
                    cursor: "inherit",
                }}
                {...inputProps}
            />
            <label htmlFor={`${value}`} style={{ cursor: "inherit" }}>
                {label}
            </label>
        </div>
    );
};
