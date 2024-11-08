import connectDB from "../../../database/connectDB";
import alumnibatch from "@/models/alumnibatch";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    try {
        const data = await alumnibatch.find();
        return NextResponse.json(data, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ error: "Failed to fetch alumni batch data" }, { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        const body = await req.json();
        const newAlumnibatch = new alumnibatch(body);
        await newAlumnibatch.save();
        return NextResponse.json({ message: "Alumni batch added successfully" }, { status: 201 });
    }
    catch (err) {
        return NextResponse.json({ error: "Failed to add alumni batch" }, { status: 500 });
    }
}

export async function DELETE(req) {
    await connectDB();
    try {
        const id = req.nextUrl.searchParams.get("id");
        var obj = await alumnibatch.findByIdAndDelete(id);
        if (obj) {
            return NextResponse.json({ message: "deleted successfully" }, { status: 200 });
        }
        return NextResponse.json({ message: "not found" }, { status: 404 });
    }
    catch (err) {
        return NextResponse.json({ message: "Something error" }, { status: 500 });
    }
}