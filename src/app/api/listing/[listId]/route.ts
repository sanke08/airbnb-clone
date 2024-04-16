import { getUser } from "@/action/getUser"
import { db } from "@/lib/db"
import listingModal from "@/lib/modals/listing.modal"
import { NextRequest, NextResponse } from "next/server"
import { UserType } from "../../../../../global.types"
import { z } from "zod"
import { createListingValidator } from "@/lib/validator/listing.validator"
import reservationModal from "@/lib/modals/reservation.modal"



export const DELETE = async (req: NextRequest, { params }: { params: { listId: string } }) => {
    try {
        const user = await getUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        const { listId } = params;
        if (!listId) return NextResponse.json({ message: "Provide Proper item" }, { status: 400 })
        await db()
        const list = await listingModal.findOne({ _id: listId, creator: user._id })
        if (list) return NextResponse.json({ message: "You not allowed to delete this item" }, { status: 401 })
        const reservation = await reservationModal.findOne({ listing: list._id })
        if (reservation) return NextResponse.json({ message: "not able to delete listing" }, { status: 400 })
        await listingModal.findByIdAndDelete(listId)
        return NextResponse.json({ message: "Success" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Serever error" }, { status: 500 })
    }
}


export const PUT = async (req: NextRequest, { params }: { params: { listId: string } }) => {
    try {
        if (!params.listId) return NextResponse.json({ message: "listId missing" }, { status: 400 })
        const user: UserType | null = await getUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        const body = await req.json()
        const { title, description, image, category, roomCount, bathroomCount, guestCount, location, price, type } = createListingValidator.parse(body)
        await db()
        const listing = await listingModal.findOne({ _id: params.listId, creator: user._id })
        if (!listing) return NextResponse.json({ message: "Listing Not found" }, { status: 404 })
        await listingModal.findByIdAndUpdate(params.listId, { title, description, image: "kkkkk", category, roomCount, guestCount, location, price, bathroomCount, type })
        return NextResponse.json({ message: "Sucess" }, { status: 200 })
    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
        }
        return NextResponse.json({ message: "something went wrong" }, { status: 500 })
    }
}