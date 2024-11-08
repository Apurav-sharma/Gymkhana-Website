import member from "@/models/Member";
import { NextResponse } from "next/server";
import connectDB from "@/database/connectDB";
//delete the given member
export async function DELETE(req,{params}){
    try{
        await connectDB();
        const memberID=params.id;
        console.log(memberID);
        const foundMember=await member.findByIdAndDelete(memberID);
        // console.log(foundMember);
        return new NextResponse(JSON.stringify({success:true,data:foundMember}));
    }
    catch(error){
        console.log("not found");
        console.log(error);
        return new NextResponse(JSON.stringify({success:false,error:error.message}));
    }
}