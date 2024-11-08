import connectDB from '../../../database/connectDB';
import notice from '../../../models/notice';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB();
    try {
        const notices = await notice.find();
        return NextResponse.json(notices);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch notices" });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        const body = await req.json();
        const newNotice = new notice(body);
        await newNotice.save();
        return NextResponse.json({ message: "added successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to post data", error }, { status: 500 });
    }
}

export async function DELETE(req) {
    await connectDB();
    try {
        const id = req.nextUrl.searchParams.get("id");
        var obj = await notice.findByIdAndDelete(id);
        if (obj) {
            return NextResponse.json({ message: "deleted successfully" }, { status: 200 });
        }
        return NextResponse.json({ message: "not found" }, { status: 404 });
    }
    catch (err) {
        return NextResponse.json({ message: "Something error" }, { status: 500 });
    }
}