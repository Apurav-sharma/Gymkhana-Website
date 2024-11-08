import connectDB from "../../../../../database/connectDB";
import fest from "../../../../../models/fest";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    await connectDB();
    const { tag, year } = params;

    try {
        const fests = await fest.find({ festname: tag, year: year });
        return NextResponse.json(fests, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ error: "Failed to fetch festivals by tag and year" }, { status: 500 });
    }
}
