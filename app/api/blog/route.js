import Blog from "../../../models/blog";
import connectDB from "../../../database/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    try {
        const blogs = await Blog.find();
        return new Response(JSON.stringify(blogs), { status: 200 });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return new Response(JSON.stringify({ message: 'Error fetching blogs' }), { status: 500 });
    }
}

export async function POST(request) {
    await connectDB();
    try {
        const body = await request.json();
        const newBlog = new Blog(body);
        const savedBlog = await newBlog.save();
        return new Response(JSON.stringify(savedBlog), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error creating blog' }), { status: 500 });
    }
}

export async function DELETE(req) {
    await connectDB();
    try {
        const id = req.nextUrl.searchParams.get("id");
        var obj = await Blog.findByIdAndDelete(id);
        if (obj) {
            return NextResponse.json({ message: "deleted successfully" }, { status: 200 });
        }
        return NextResponse.json({ message: "not found" }, { status: 404 });
    }
    catch (err) {
        return NextResponse.json({ message: "Something error" }, { status: 500 });
    }
}

// export async function DELETE(request) {
//     await dbconnect();
//     try {
//         const { _id } = await request.json();
//         if (!_id) {
//             return new Response(JSON.stringify({ message: 'Blog ID is required' }), { status: 400 });
//         }

//         const deletedBlog = await Blog.findByIdAndDelete(_id);
//         if (!deletedBlog) {
//             return new Response(JSON.stringify({ message: 'Blog not found' }), { status: 404 });
//         }
//         return new Response(JSON.stringify({ message: 'Blog deleted successfully' }), { status: 200 });
//     } catch (error) {
//         console.error('Error deleting blog:', error);
//         return new Response(JSON.stringify({ message: 'Error deleting blog' }), { status: 500 });
//     }
// }