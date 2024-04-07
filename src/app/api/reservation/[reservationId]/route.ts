import { getUser } from "@/action/getUser"
import reservationModal from "@/lib/modals/reservation.modal"
import { NextRequest, NextResponse } from "next/server"


export const DELETE = async (req:NextRequest,{ params }: { params: { reservationId: string } }) => {
    try {
        const user = getUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        const { reservationId } = params
        if (!reservationId) return NextResponse.json({ message: "ReservationId not found" }, { status: 400 })
        await reservationModal.findByIdAndDelete(reservationId)
        return NextResponse.json({ message: "success" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "something went wrong" }, { status: 500 })
    }
}