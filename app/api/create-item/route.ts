import { connectToDatabase } from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formValuesJSON = await request.json();
  const formValuesArray = Object.entries(formValuesJSON.form.values);
  console.log(formValuesArray[1][1]);

  const collection = await connectToDatabase();
  await collection.insertOne({
    itemName: formValuesArray[0][1],
    itemSN: formValuesArray[1][1],
    itemAssetTag: formValuesArray[2][1],
    itemCategory: formValuesArray[3][1],
  });
  return NextResponse.json({ response: "Item added to DB" });
}
