import mongoose from "mongoose"

const favouriteSchema = new mongoose.Schema({
    listId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
})

export default mongoose.models.Favourite || mongoose.model("Favourite", favouriteSchema)