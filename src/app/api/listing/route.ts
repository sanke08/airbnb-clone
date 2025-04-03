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
        const { title, description, category, roomCount, bathroomCount, guestCount, location, price, type } = createListingValidator.parse(body)
        await db()
        console.log(body.images)
        await listingModal.create({
            title, description, image: [...body.images], category, roomCount, guestCount, price, bathroomCount, creator: user._id, type,
            location: { ...JSON.parse(location) }
        })
        return NextResponse.json({ message: "Sucess" }, { status: 200 })
    } catch (error) {
        // console.log(error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
        }
        return NextResponse.json({ message: "something went wrong" }, { status: 500 })
    }
}


export const GET = async (req: NextRequest) => {
    try {
        const url = new URL(req.url)
        const amenities = url.searchParams.get("amenities")
        const type = url.searchParams.get("type")
        const roomCount = url.searchParams.get("rooms")
        const bathroomCount = url.searchParams.get("bathRooms")
        const bedRooms = url.searchParams.get("bedRooms")

        // const { tv, kitchen, wifi } = amenities? JSON.parse(amenities):null
        // @ts-expect-error // weieuhi7
        const price = JSON.parse(url?.searchParams.get("price"))
        await db()
        const filter: any = {}
        if (roomCount)
            filter.roomCount = { $gte: parseInt(roomCount) }
        if (bathroomCount)
            filter.bathroomCount = { $gte: parseInt(bathroomCount) }
        if (bedRooms)
            filter.bedRoomCount = { $gte: parseInt(bedRooms) }
        if (type !== "both")
            filter.type = type
        if (price.minimum) {
            filter.price = { $gte: price.minimum, ...filter.price }
        }
        if (price.maximum) {
            filter.price = { $lte: price.maximum, ...filter.price }
        }
        console.log(filter)
        // maximum:price.maximum,minimum:price.minimum,


        const items = await listingModal.countDocuments({
            ...filter,
        })

        console.log(items)

        return NextResponse.json({ items }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 200 })
    }
}