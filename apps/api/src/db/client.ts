import { Collection } from "mongodb";
import { DbRoomConfiguration } from "../../../../apps/api/src/db/room-configuration.model";
import { MongoClient } from "@wojo/mongo";

export class Db extends MongoClient {
    async init() {
        await this.connect();
    }
    get roomConfiguration(): Collection<DbRoomConfiguration> {
        return this.db().collection<DbRoomConfiguration>("room-configuration", {
            ignoreUndefined: true,
        });
    }
}
