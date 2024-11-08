import connectDB from "@/database/connectDB";
import Club from "@/models/Club";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const db=await connectDB();
    const requestBody = await req.json();
    
    const newClub = new Club(requestBody);
    await newClub.save();
    console.log(requestBody);
    console.log(newClub);
    return new NextResponse(JSON.stringify({ success: true, data: newClub }));
  } catch (error) {
    console.log("error:\t", error.message);
    return new NextResponse({ success: false, error: error.message });
  }
}
