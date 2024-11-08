import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isSuperUser: { type: Boolean, default: false }
});

const admin = mongoose.models.admin || mongoose.model('admin', adminSchema);
export default admin;