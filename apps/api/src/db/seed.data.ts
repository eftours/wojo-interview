import { BedCode } from "./room.model";

export const rooms = [
    {
        name: "Single",
        description: "A small room with a bed for one person",
        capacity: 1,
        bedCode: BedCode.SINGLE,
        price: 100,
        roomInventory: {
            availability: 10,
        },
        tourCode: "LPR",
    },
    {
        name: "Double",
        description: "A standard room with a queen bed for 2",
        capacity: 2,
        bedCode: BedCode.DOUBLE,
        price: 200,
        roomInventory: {
            availability: 10,
        },
        tourCode: "LPR",
    },
    {
        name: "Triple",
        description: "A large room with a queen bed for 2 and a twin bed for 1",
        capacity: 3,
        bedCode: BedCode.TRIPLE,
        price: 300,
        roomInventory: {
            availability: 2,
        },
        tourCode: "LPR",
    },
    {
        name: "Quad",
        description: "An extra large room with two queen beds for 4 people total",
        capacity: 4,
        bedCode: BedCode.QUAD,
        price: 400,
        roomInventory: {
            availability: 1,
        },
        tourCode: "LPR",
    },
    {
        name: "Single",
        description: "A small room with a bed for one person",
        capacity: 1,
        bedCode: "S",
        price: 100,
        roomInventory: {
            availability: 10,
        },
        tourCode: "GTI",
    },
    {
        name: "Double",
        description: "A standard room with a queen bed for 2",
        capacity: 2,
        bedCode: "D",
        price: 200,
        roomInventory: {
            availability: 50,
        },
        tourCode: "GTI",
    },
    {
        name: "Quad",
        description: "An extra large room with two queen beds for 4 people total",
        capacity: 4,
        bedCode: "Q",
        price: 400,
        roomInventory: {
            availability: 0,
        },
        tourCode: "GTI",
    },
    {
        name: "Double",
        description: "A standard room with a queen bed for 2",
        capacity: 2,
        bedCode: "D",
        price: 200,
        roomInventory: {
            availability: 20,
        },
        tourCode: "GIT",
    },
];

export const tours = [
    {
        tourCode: "LPR",
        startDate: new Date("2021-06-01"),
        endDate: new Date("2021-06-10"),
        name: "London, Paris, & Rome",
    },
    {
        tourCode: "GTI",
        startDate: new Date("2021-06-01"),
        endDate: new Date("2021-06-10"),
        name: "India: Delhi, Agra & Jaipur",
    },
    {
        tourCode: "GIT",
        startDate: new Date("2021-06-01"),
        endDate: new Date("2021-06-10"),
        name: "A Week in Greece: Athens, Mykonos & Santorini",
    },
];
