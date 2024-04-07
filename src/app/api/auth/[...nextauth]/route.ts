import bcryptjs from "bcryptjs"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { Account, AuthOptions, User } from "next-auth"
import NextAuth from "next-auth/next"
import { db } from "@/lib/db"
import userModal from "@/lib/modals/user.modal"


export const authOption: AuthOptions = {
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
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: User, account: Account }) {
            if (account.provider === "credentials") {
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

export const handler = NextAuth(authOption)

export { handler as GET, handler as POST } 