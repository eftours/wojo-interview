import { Collection } from "mongodb";
import { DbRoomConfiguration } from "./room-configuration.model";
import { MongoClient } from "@wojo/mongo";
import { DbTour } from "./tour.model";

export class Db extends MongoClient {
    async init() {
        await this.connect();
    }
    get roomConfiguration(): Collection<DbRoomConfiguration> {
        return this.db().collection<DbRoomConfiguration>("room-configuration", {
            ignoreUndefined: true,
        });
    }
    get tour(): Collection<DbTour> {
        return this.db().collection<DbTour>("tour", {
            ignoreUndefined: true,
        });
    }
}
