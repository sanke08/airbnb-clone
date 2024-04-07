import { getUser } from "@/action/getUser";
import reservationModal from "@/lib/modals/reservation.modal";
import { createReservationValidator } from "@/lib/validator/reservation.validator";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";




export const POST = async (req: NextRequest) => {
    try {
        const user = await getUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        const body = await req.json()
        const { listingId, startDate, endDate, totalPrice } = createReservationValidator.parse(body)
        if (!endDate || !startDate) return
        await reservationModal.create({listing: listingId, startDate: new Date(startDate), endDate: new Date(endDate), totalPrice,reserver:user._id })
        return NextResponse.json({ message: "Reservation was successfully" }, { status: 200 })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
        }
        return NextResponse.json({ message: "something went wrong" }, { status: 500 })

    }
}