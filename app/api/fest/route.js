import connectDB from "../../../database/connectDB";
import fest from "../../../models/fest";
import { NextResponse } from "next/server";


// export async function GET() {
//     await connectDB();
//     try {
//         const festivals = await fest.find();
//         return NextResponse.json(festivals, { status: 200 });
//     }
//     catch (err) {
//         return NextResponse.json({ error: "Failed to fetch festivals" }, { status: 500 });
//     }
// }
export async function POST(req) {
    await connectDB();
    try {
        const body = await req.json();
        const newFestival = new fest(body);
        await newFestival.save();
        return NextResponse.json({ message: "Festival added successfully" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Failed to add new festival" }, { status: 500 });
    }
}

export async function DELETE(req) {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");
    await fest.findByIdAndDelete(id);
    return NextResponse.json({ message: "Festival deleted successfully" }, { status: 200 });
}