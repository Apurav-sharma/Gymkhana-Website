import { NextResponse } from "next/server";
import Member from "@/models/Member";
import connectDB from "@/database/connectDB";
export async function GET(req,{params}){
    try{
        const db=await connectDB();
        const committee=params.committee.toLowerCase();
        // console.log(committee);
        const members=await Member.find({committee:committee});
        // console.log(members);
        return new NextResponse(JSON.stringify({success:true,data:members}))
    }
    catch(error){
        console.log("not found");
        return new NextResponse({success:false,error:error.message});
    }
}