import { Collection } from "mongodb";
import { DbRoom } from "./room.model";
import { MongoClient } from "@wojo/mongo";
import { DbTour } from "./tour.model";

export class Db extends MongoClient {
    async init() {
        await this.connect();
    }
    get room(): Collection<DbRoom> {
        return this.db().collection<DbRoom>("room", {
            ignoreUndefined: true,
        });
    }
    get tour(): Collection<DbTour> {
        return this.db().collection<DbTour>("tour", {
            ignoreUndefined: true,
        });
    }
}
