import { connectToDatabase } from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const itemSN = await request.json();
  console.log(itemSN.data);

  const collection = await connectToDatabase();
  await collection.deleteOne({ itemSN: itemSN.data });

  return NextResponse.json({ response: "Item removed from DB" });
}
