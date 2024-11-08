import { NextResponse } from "next/server";
import Member from "@/models/Member";
import connectDB from "@/database/connectDB";
export async function GET(req,{params}){
    try{
        const db=await connectDB();
        const club=params.club;
        // console.log(club);
        const members=await Member.find({club:club});
        // console.log(members);
        if(members.length>0){
            
            return new NextResponse(JSON.stringify({success:true,data:members}))
        }
        return new NextResponse(JSON.stringify({success:false,message:"not found"}),{status:404});
    }
    catch(error){
        console.log("not found");
        return new NextResponse(JSON.stringify({success:false,error:error.message}));
    }
}

