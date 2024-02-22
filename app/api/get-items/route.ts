import { connectToDatabase } from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const collection = await connectToDatabase();
  const itemDocuments = collection.find();
  const itemDocumentsArray = await itemDocuments.toArray();
  return NextResponse.json({ response: itemDocumentsArray });
}
