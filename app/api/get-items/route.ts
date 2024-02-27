import { connectToDatabase } from "../../lib/mongodb";

export default async function GET() {
  const collection = await connectToDatabase();
  const itemDocuments = collection.find();
  const itemDocumentsArray = await itemDocuments.toArray();
  return itemDocumentsArray;
}
