"use client"

import React, { useRef } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { } from "lucide-react"
import { signIn } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { registerRequest } from '@/lib/validator/user.validator'
import axios from 'axios'
import { string } from 'zod'
import { useDispatch } from 'react-redux'
import { CLOSE_AUTH } from '@/redux/constant'
import ErrorField from '../ErrorField'
import { BsGoogle } from 'react-icons/bs'




const Register = ({ className, onClick }: { className: string, onClick: () => void }) => {
    const userDate = useRef({
        name: "",
        email: "",
        password: ""
    })
    const errRef = useRef("")
    const dispatch = useDispatch()
    const { mutate: register, isPending } = useMutation({
        mutationFn: async () => {
            const payload: registerRequest = {
                name: userDate.current.name,
                email: userDate.current.email,
                password: userDate.current.password
            }
            const { data } = await axios.post("/api/register", payload)
            return data
        },
        onSuccess: () => {
            dispatch({ type: CLOSE_AUTH })
        },
        onError: ({ response }: { response: { data: { message: string } } }) => {
            errRef.current = response.data.message
        }

    })



    return (
        <div className={className} >
            <div className=' w-full h-full flex flex-col gap-2 pt-5'>
                <Input onChange={(e) => userDate.current.name = e.target.value} disabled={isPending} placeholder="Name" type="text" required className=' bg-white text-black ' />
                <Input onChange={(e) => userDate.current.email = e.target.value} disabled={isPending} placeholder="Email" type="email" required className=' bg-white text-black ' />
                <Input onChange={(e) => userDate.current.password = e.target.value} disabled={isPending} placeholder="Password" type="password" required className=' bg-white text-black ' />
                <ErrorField error={errRef.current} />
                <Button onClick={() => register()} isLoading={isPending} variant={"none"} className=' bg-primary text-white ' >Register</Button>
                <Button onClick={() => signIn("google")} disabled={isPending} variant={"secondary"} className='text-black border-2 border-neutral-500/50 mt-5' >
                 <BsGoogle size={20} />   Continue with google
                </Button>
                <Button onClick={onClick} disabled={isPending} variant={"none"} className=' w-max mx-auto text-neutral-500  hover:text-neutral-600' >
                    <p>
                        Already have an account?
                        <span className=" text-neutral-800 cursor-pointer hover:underline " > Log in</span>
                    </p>
                </Button>
            </div>
        </div>
    )
}

export default Register