import { registerValidator } from "@/lib/validator/user.validator";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import userModal from "@/lib/modals/user.modal";
import { ZodError } from "zod";



export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const { email, name, password } = registerValidator.parse(body)
        const hashPassword = await bcryptjs.hash(password, 10)
        await userModal.create({ email, password: hashPassword, name })
        return NextResponse.json({ message: "success" }, { status: 200 })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
        }
        return NextResponse.json({ message: "something went wrong" }, { status: 500 })

    }
}