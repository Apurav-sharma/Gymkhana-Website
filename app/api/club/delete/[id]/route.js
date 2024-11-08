import connectDB from "@/database/connectDB";
import committeeClub from "@/models/Club";
import { NextResponse } from "next/server";
import member from "@/models/Member";
export async function DELETE(req,{params}){
    try {
        await connectDB();
        const id=params.id;
        const found = await committeeClub.findByIdAndDelete(id);
        const jsecretory = found.jsecretory;
        const secretory = found.secretory;
        const delJsec = member.findByIdAndDelete(jsecretory);
        const delSec=member.findByIdAndDelete(secretory);
        // console.log(jsecretory,secretory);
        if(found && delJsec && delSec){
            return new NextResponse(JSON.stringify({success:true,data:found}));
        }
        else{
            return new NextResponse(JSON.stringify({success:false,data:found}))
        }
    }
    catch(error){
        return new NextResponse(JSON.stringify({success:false,data:error.message}),{status:500});
    }
}