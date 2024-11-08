import Committee from "@/models/Committee";
import { NextResponse } from "next/server";
export async function GET(req,{params}) {
    const name=params.name;
    // console.log(name);
    const committees=await Committee.find({name:name});
    return new NextResponse(JSON.stringify({success:true,data:committees}));
}