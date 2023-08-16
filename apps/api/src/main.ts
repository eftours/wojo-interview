import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import { json } from "body-parser";
import { schema, Context } from "./schema";
import { config } from "./config";
import * as Sentry from "@sentry/node";
import { Db } from "./db/client";
import cors from "cors";

Sentry.init();

const db = new Db(config.DB_URL);

async function main() {
    await db.init();
    const app = express();
    const httpServer = http.createServer(app);
    httpServer.keepAliveTimeout = 65000;
    httpServer.headersTimeout = 70000;
    const server = new ApolloServer<Context>({
        schema,
    });
    await server.start();
    app.use(
        "/graphql",
        cors<cors.CorsRequest>({ origin: ["http://localhost:3000"] }),
        json(),
        expressMiddleware(server, {
            context: async () => {
                return {
                    db,
                };
            },
        })
    );
    app.use("/health", (_, res) => res.sendStatus(200));
    httpServer.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    });
}
main();
