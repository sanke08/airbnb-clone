import mongoose from "mongoose"

const listingchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    category: { type: String },
    roomCount: { type: Number },
    bathroomCount: { type: Number },
    guestCount: { type: Number },
    location: { type: String },
    price: { type: Number, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
})

export default mongoose.models.Listing || mongoose.model("Listing", listingchema)