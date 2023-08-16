import { z } from "zod";

const configSchema = z.object({
    DB_URL: z.string().optional().default("mongodb://localhost:27017/?replicaSet=rs0"),
});

export type Config = z.infer<typeof configSchema>;

export const config = configSchema.parse(process.env);
