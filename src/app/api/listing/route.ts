import { getUser } from "@/action/getUser"
import { db } from "@/lib/db"
import listingModal from "@/lib/modals/listing.modal"
import { createListingValidator } from "@/lib/validator/listing.validator"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { UserType } from "../../../../global.types"


export const POST = async (req: NextRequest) => {
    try {
        const user: UserType | null = await getUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        const body = await req.json()
        const { title, description, image, category, roomCount, bathroomCount, guestCount, location, price, } = createListingValidator.parse(body)
        await db()
        await listingModal.create({ title, description, image: "kkkkk", category, roomCount, guestCount, location, price, bathroomCount, creator: user._id })
        return NextResponse.json({ message: "Sucess" }, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
        }
        return NextResponse.json({ message: "something went wrong" }, { status: 500 })
    }
}


export const GET = async (req: NextRequest) => {
    try {
        const url = new URL(req.url)
        const amenities = await url.searchParams.get("amenities")
        const price = url.searchParams.get("price")
        const type = url.searchParams.get("type")
        const roomCount = url.searchParams.get("rooms")
        const bathroomCount = url.searchParams.get("bathRooms")
        const bedRooms = url.searchParams.get("bedRooms")

        const { tv, kitchen, wifi } = JSON.parse(amenities)
        const { minimum, maximum } = JSON.parse(price)
        console.log(typeof minimum, typeof maximum)
        await db()
        const items = await listingModal.countDocuments({
            roomCount,
            bathroomCount,
            price: { $gte: minimum ?? 0, $lte: maximum ?? 5000 },
        })
        console.log(items)


        return NextResponse.json({ message: items }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 200 })
    }
}