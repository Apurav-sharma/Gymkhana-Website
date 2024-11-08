import connectDB from "@/database/connectDB";
import admin from "@/models/admin";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req) { 
    try {
        await connectDB();
        const requestBody = await req.json();
        const { username, password } = requestBody;
        console.log(username);
        const foundAdmin = await admin.findOne({ username: username });
        if (foundAdmin) {
            const hashedPassword = foundAdmin.password;
            const extracted = await bcrypt.compare(password, hashedPassword);
            if (extracted) {
                return new NextResponse(JSON.stringify({success:true,body:{username:username,isSuperuser:foundAdmin.isSuperUser}}));
            }
            else {
                return new NextResponse(JSON.stringify({success:false,body:"INCORRECT CREDENTIALS, ACCESS DENIED!"}),{status:401})
            }
        }
        else {
            return new NextResponse(JSON.stringify({success:false,body:"INCORRECT CREDENTIALS, ACCESS DENIED!"}),{status:401})
        }
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ success: false, body: err.message }),{status:500})
    }
}