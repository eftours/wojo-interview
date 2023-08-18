import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export type SelectProps<T extends string | number> = {
    value: T;
    items: { label: string; value: T }[];
    onChange: React.Dispatch<React.SetStateAction<T>>;
    labelText?: string;
};

export function Select<T extends string | number>({ items, onChange, value, labelText }: SelectProps<T>) {
    const [open, setOpen] = useState(false);
    return (
        <>
            {labelText ? <Text style={styles.label}>{labelText}</Text> : null}
            <DropDownPicker
                style={styles.dropdown}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={onChange}
            />
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontWeight: "500",
        marginBottom: 8,
    },
    dropdown: {
        marginBottom: 16,
    },
});
