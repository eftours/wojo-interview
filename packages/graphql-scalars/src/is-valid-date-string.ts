export const isValidDateString = (input: unknown): input is string => {
    if (typeof input !== "string") {
        return false;
    }
    const dateString = input.substring(0, 10);
    if (dateString.length !== 10) {
        return false;
    }
    const [year, month, day] = dateString.split("-").map((x) => parseInt(x));
    if (year < 1000 || year > 9999 || isNaN(year)) {
        return false;
    }
    if (month < 1 || month > 12 || isNaN(month)) {
        return false;
    }
    if (day < 1 || day > 31 || isNaN(day)) {
        return false;
    }
    return true;
};
