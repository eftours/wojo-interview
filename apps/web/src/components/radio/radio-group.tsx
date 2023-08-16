import { InputHTMLAttributes } from "react";
import { RadioButton } from "./radio-button";

export type RadioProps = {
    items: { label: string; value: string | number }[];
    value?: string | number;
    labelText?: string;
    onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
};

export const RadioGroup: React.FC<RadioProps> = ({ items, value, labelText, onChange }) => {
    return (
        <>
            {labelText ? <label style={{ fontWeight: 500 }}>{labelText}</label> : null}
            <fieldset style={{ marginTop: 8 }}>
                {items.map((item, index) => {
                    return (
                        <RadioButton
                            key={`${index}-${item.value}`}
                            value={item.value}
                            label={item.label}
                            onChange={onChange}
                            checked={value === item.value}
                        />
                    );
                })}
            </fieldset>
        </>
    );
};
