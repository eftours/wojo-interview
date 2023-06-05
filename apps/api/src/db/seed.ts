import { Db } from "./client";
import { config } from "../config";
import { rooms } from "./seed.data";

const db = new Db(config.DB_URL);
async function seed() {
    try {
        await db.connect();
        await db.roomConfiguration.insertMany(
            rooms.map((room) => ({
                ...room,
                createdAt: new Date(),
                updatedAt: new Date(),
            }))
        );
        console.log("Successfully seeded data.");
    } catch (e) {
        console.log("Error seeding data: ", e);
    }
}
seed();
