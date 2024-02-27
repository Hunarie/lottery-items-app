import { connectToDatabase } from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentValuesJSON = await request.json();
  const currentValuesArray = Object.entries(currentValuesJSON.form.values);
  console.log(currentValuesArray[1][1]);

  const collection = await connectToDatabase();
  await collection.updateOne(
    { 
        itemSN: currentValuesArray[1][1] 
    },
    { $set:{
        itemName:currentValuesArray[0][1],
        itemSN:currentValuesArray[1][1],
        itemAssetTag: currentValuesArray[2][1],
        itemCategory: currentValuesArray[3][1]
    }})
  return NextResponse.json({ response: "Item edited in DB" });
}
