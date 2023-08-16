export type DbRoom = {
    capacity: number;
    bedCode: BedCode;
    price: number;
    name: string;
    description: string;
};

export enum BedCode {
    SINGLE = "SINGLE",
    DOUBLE = "DOUBLE",
    TRIPLE = "TRIPLE",
    QUAD = "QUAD",
}
