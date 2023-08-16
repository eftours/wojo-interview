import { MongoClient as BaseMongoClient, MongoClientOptions } from "mongodb";

export type MongoClientArgs = {
    mongoUser: string;
    mongoPassword: string;
    mongoUrl: string;
    mongoDb: string;
};

export function createUrl(args: MongoClientArgs): string {
    return `mongodb+srv://${args.mongoUser}:${args.mongoPassword}@${args.mongoUrl}/${args.mongoDb}?retryWrites=true&w=majority`;
}

export abstract class MongoClient extends BaseMongoClient {
    constructor(args: MongoClientArgs, options?: MongoClientOptions);
    constructor(url: string, options?: MongoClientOptions);
    constructor(...args: [string | MongoClientArgs, MongoClientOptions?]) {
        const [arg1, arg2] = args;
        if (typeof arg1 === "string") {
            super(arg1, arg2);
        } else {
            const url = createUrl(arg1);
            super(url, arg2);
        }
    }

    async reset() {
        const collections = await this.db().collections();
        for (const collection of collections) {
            await collection.deleteMany({});
        }
    }
}
