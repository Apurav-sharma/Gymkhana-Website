import connectDB from "@/database/connectDB";
import Committee from "@/models/Committee";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    await connectDB();
    const requestBody = await req.json();
    const newCommittee = new Committee(requestBody);
    await newCommittee.save();
    return new NextResponse(
      JSON.stringify({ success: true, data: newCommittee })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: true, data: error.message }),
      { status: 500 }
    );
  }
}
