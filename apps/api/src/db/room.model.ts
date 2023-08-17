export type DbRoom = {
    capacity: number;
    bedCode: BedCode;
    price: number;
    name: string;
    description: string;
    tourCode: string;
    roomInventory: {
        availability: number;
    };
};

export enum BedCode {
    SINGLE = "SINGLE",
    DOUBLE = "DOUBLE",
    TRIPLE = "TRIPLE",
    QUAD = "QUAD",
}
