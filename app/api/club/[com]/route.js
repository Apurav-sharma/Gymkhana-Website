import connectDB from "@/database/connectDB";
import committeeClub from "@/models/Club";
// import Committee from "@/models/Committee";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  // fetch data from your database
  try {
    await connectDB();
    const com = params.com;
    // console.log(committee);
    const data = await committeeClub.find({ committee: com });
    // console.log(data);
    return new NextResponse(JSON.stringify({ success: true, data:data }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message })
    );
  }
}
