import connectDB from "../../../database/connectDB";
import { NextResponse } from "next/server";
import alumni from "../../../models/alumni";

export async function GET() {
    await connectDB();
    try {
        const about = await alumni.find();
        return NextResponse.json(about, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ error: "Failed to fetch about us data" }, { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        const body = await req.json();
        const newAlumni = new alumni(body);
        await newAlumni.save();
        return NextResponse.json({ message: "Added successfully" }, { status: 201 });
    }
    catch (err) {
        return NextResponse.json({ error: "Failed to add about us data" }, { status: 500 });
    }
}

export async function DELETE(req) {
    await connectDB();
    try {
        const id = req.nextUrl.searchParams.get("id");
        var obj = await alumni.findByIdAndDelete(id);
        if (obj) {
            return NextResponse.json({ message: "deleted successfully" }, { status: 200 });
        }
        return NextResponse.json({ message: "not found" }, { status: 404 });
    }
    catch (err) {
        return NextResponse.json({ message: "Something error" }, { status: 500 });
    }
}