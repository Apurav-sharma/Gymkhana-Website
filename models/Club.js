import mongoose from "mongoose";
const { Schema } = mongoose;

const clubSchema = new Schema({
    name: { type: String, required: true },
    secretory: { type: Schema.Types.ObjectId, ref: 'member' },
    jsecretory: { type: Schema.Types.ObjectId, ref: 'member' },
    committee: { type: String, required: true },
    logo: { type: String, required: true },
    description: { type: String, required: true },
});

const committeeClub = mongoose.models.committeeClub || mongoose.model("committeeClub", clubSchema);
export default committeeClub;