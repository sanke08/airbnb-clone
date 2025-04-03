import bcryptjs from "bcryptjs"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import type { Account, NextAuthOptions, User } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import { db } from "@/lib/db"
import userModal from "@/lib/modals/user.modal"

export const authOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }
                const user = await userModal.findOne({ email: credentials.email })
                if (!user) {
                    throw new Error('Invalid credentials');
                }
                const isCorrectPassword = await bcryptjs.compare(credentials.password, user.password)
                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }
                return user
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: User | AdapterUser, account: Account | null }) {
            if (account && account.provider === "credentials") {
                return true
            }
            try {
                await db()
                const existUser = await userModal.findOne({ email: user.email })
                if (!existUser) {
                    await userModal.create({
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        password: ""
                    })
                }
                return true
            } catch (error) {
                return false
            }
        }
    },
    pages: {
        signIn: "/"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}