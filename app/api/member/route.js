import member from "@/models/Member";
import { NextResponse } from "next/server";
import connectDB from "@/database/connectDB";
export async function POST(req){
    try{
        const db=await connectDB();
        const requestBody=await req.json();
        // console.log(requestBody);
        const newMember=new member(requestBody);
        await newMember.save();
        return new NextResponse(JSON.stringify({data:newMember, success: true}), {status: 201});
    }
    catch(error){
        return new NextResponse(JSON.stringify({error: error.message,success:false}), {status: 500});
    }
}