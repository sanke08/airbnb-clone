import { getServerSession } from "next-auth/next"
import userModal from "@/lib/modals/user.modal"
import { db } from "@/lib/db"
import { authOption } from "@/app/api/auth/[...nextauth]/route"

export const getSession = async () => {
    return await getServerSession(authOption)
}

export const getUser = async () => {
    try {
        const session = await getSession()
        if (!session?.user?.email) {
            return null;
        }
        await db()
        const user = await userModal.findOne({ email: session.user.email as string }).populate("email name _id image")
        if (!user) return null
        return user
    } catch (error) {
        return null
    }
}