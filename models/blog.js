import mongoose from "mongoose";

const newblog = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    }
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', newblog);
export default Blog;