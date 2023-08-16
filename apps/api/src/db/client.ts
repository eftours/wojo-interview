import { Collection } from "mongodb";
import { DbRoom } from "./room.model";
import { MongoClient } from "@wojo/mongo";

export class Db extends MongoClient {
    async init() {
        await this.connect();
    }
    get room(): Collection<DbRoom> {
        return this.db().collection<DbRoom>("room", {
            ignoreUndefined: true,
        });
    }
}
