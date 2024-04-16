import { db } from "@/lib/db"
import listingModal from "@/lib/modals/listing.modal"
import { NextResponse } from "next/server"

export const PUT = async () => {
    try {
        await db()
    //    const y= await listingModal.find({
    //         amenities: "tv" 
    //     })
        // await listingModal.updateMany({}, {
        //     $push: {
        //         amenities: "tv"
        //     }
        // })
        return NextResponse.json({ "listings": "jhgbv" })
    } catch (error) {
        return NextResponse.json(error)

    }
}