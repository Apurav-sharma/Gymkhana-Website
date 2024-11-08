import admin from "@/models/admin";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/database/connectDB";
export async function POST(req) {
    try {
        await connectDB();
        const requestBody = await req.json();
        let { username, password, isSuperUser } = requestBody;
        if (isSuperUser === null) {
            isSuperUser = false;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        const newAdmin = new admin({
            username: username,
            password: hashedPassword,
            isSuperUser: null
        });
        await newAdmin.save();
        return new NextResponse(JSON.stringify({ success: true, data: newAdmin }));
    }
    catch (error) {
        console.log(error.message);
        return new NextResponse(JSON.stringify({ success: false, error: error.message }));
    }
}