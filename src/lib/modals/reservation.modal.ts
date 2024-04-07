import mongoose from "mongoose"

const reservaionSchema = new mongoose.Schema({
    startDate: { type: Date },
    endDate: { type: Date },
    totalPrice: { type: Number },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    reserver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
})

export default mongoose.models.Reservation || mongoose.model("Reservation", reservaionSchema)