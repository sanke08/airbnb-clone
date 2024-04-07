import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    password: { type: String }
}, {
    timestamps: true
})

export default mongoose.models.User || mongoose.model("User", userSchema) 