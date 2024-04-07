import { getUser } from "@/action/getUser"
import favouriteModal from "@/lib/modals/favourite.modal"
import { NextRequest, NextResponse } from "next/server"


export const PATCH = async (req: NextRequest) => {
    try {
        const url = new URL(req.url)
        const listId = url.searchParams.get("listId")
        const user = await getUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        const fav = await favouriteModal.findOne({
            listId: listId as string,
            userId: user._id
        })
        if (fav) {
            await favouriteModal.findOneAndDelete({
                listId: listId as string,
                userId: user._id
            })
            return NextResponse.json({ message: "success" }, { status: 200 })
        } else {
            await favouriteModal.create({
                listId: listId as string,
                userId: user._id
            })
            return NextResponse.json({ message: "success" }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ message: "something went wrong" }, { status: 200 })
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const url = new URL(req.url)
        const listId = url.searchParams.get("listId")
        const user = await getUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        const fav = await favouriteModal.findOne({
            listId: listId as string,
            userId: user._id
        })
        if (!fav) return NextResponse.json({ message: "Not found" }, { status: 404 })
        return NextResponse.json({ message: "success" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "something went wrong" }, { status: 200 })
    }
}