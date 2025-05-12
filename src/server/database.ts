import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URI) {
    throw new Error("Mongo Db Uri not found");
}
const client = new MongoClient(process.env.DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function getDb(dbName: string) {
    try {
        await client.connect();
        return client.db(dbName);
    } catch (error) {
        console.log(error);
    }
}

export async function getCollection(collectionName: string) {
    const db = await getDb("next-app-db");

    if (db) return db.collection(collectionName);

    return null;
}
