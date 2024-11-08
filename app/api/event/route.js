import connectDB from "../../../database/connectDB";
import event from "../../../models/event";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    try {
        const events = await event.find();
        return NextResponse.json(events, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "erorr happened" }, { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        const body = await req.json();
        const newEvent = new event(body);
        await newEvent.save();
        return NextResponse.json({ message: "Event added successfully" }, { status: 201 });
    }
    catch (err) {
        return NextResponse.json({ error: "Failed to add event data" }, { status: 500 });
    }
}

export async function DELETE(req) {
    await connectDB();
    try {
        const id = req.nextUrl.searchParams.get("id");
        var obj = await event.findByIdAndDelete(id);
        if (obj) {
            return NextResponse.json({ message: "deleted successfully" }, { status: 200 });
        }
        else {
            return NextResponse.json({ message: "not found" }, { status: 404 });
        }
    }
    catch (err) {
        return NextResponse.json({ message: "Something error" }, { status: 500 }, err.status);
    }
}