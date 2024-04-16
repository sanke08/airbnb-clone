import mongoose from "mongoose"

const listingchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    category: { type: String },
    roomCount: { type: Number },
    bathroomCount: { type: Number },
    bedRoomCount: { type: Number },
    guestCount: { type: Number },
    location: {
        state: { type: String, required: true },
        country: { type: String, required: true },
        street: { type: String },
        address: { type: String, required: true },
    },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    amenities: [{ type: String }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
})

export default mongoose.models.Listing || mongoose.model("Listing", listingchema)