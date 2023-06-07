import { Db } from "../db/client";
import { config } from "../config";

const db = new Db(config.DB_URL);

async function reset() {
    try {
        await db.connect();
        await db.reset();
        console.log("Successfully reset data.");
    } catch (e) {
        console.log("Error resetting data: ", e);
    } finally {
        process.exit(0);
    }
}
reset();

export default reset;
