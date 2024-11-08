import mongoose from "mongoose";

const newbatch = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    batchno: {
        type: Number,
        required: true
    },
    memories: {
        type: [String],
        required: true
    },
    stories: {
        type: [String],
        required: true
    },
    reunion: {
        type: [String],
        required: true
    }
});

const alumnibatch = mongoose.models.alumnibatch || mongoose.model('alumnibatch', newbatch);
export default alumnibatch;