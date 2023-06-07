import { Db } from "./client";
import { config } from "../config";
import { rooms, tours } from "./seed.data";

const db = new Db(config.DB_URL);
async function seed() {
    try {
        await db.connect();
        await db.room.insertMany(
            rooms.map((room) => ({
                ...room,
                createdAt: new Date(),
                updatedAt: new Date(),
            }))
        );
        await db.tour.insertMany(tours.map((tour) => ({ ...tour, createdAt: new Date(), updatedAt: new Date() })));
        console.log("Successfully seeded data.");
    } catch (e) {
        console.log("Error seeding data: ", e);
    } finally {
        process.exit(0);
    }
}
seed();
