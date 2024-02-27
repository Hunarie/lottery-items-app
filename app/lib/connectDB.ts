// https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { items?: mongoDB.Collection } = {};

// Initalize Connection
export async function connectToDB() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONNECTION_STRING!,
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.ACCESS_DB_NAME);

  const itemsCollection: mongoDB.Collection = db.collection(
    process.env.ACCESS_COLLECTION_NAME!,
  );

  collections.items = itemsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${itemsCollection.collectionName}`,
  );

  return itemsCollection;
}
