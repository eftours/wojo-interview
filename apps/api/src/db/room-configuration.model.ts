export type DbRoomConfiguration = {
    capacity: number;
    bedCode: string;
    price: number;
    name: string;
    description: string;
    roomInventory: {
        availability: number;
    };
};
