import mongoose from "mongoose";

const newAlumni = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    batch: {
        type: Number,
        required: true
    }
});

const alumni = mongoose.models.alumni || mongoose.model('alumni', newAlumni);
export default alumni;