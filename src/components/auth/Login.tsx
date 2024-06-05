"use client"

import React, { useRef } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { } from "lucide-react"
import ErrorField from '../ErrorField'
import { signIn } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { BsGoogle } from 'react-icons/bs'


const Login = ({ className, onClick }: { className: string, onClick: () => void }) => {
    
    const errRef = useRef("")
    const userDate = useRef({
        email: "",
        password: ""
    })

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            await signIn("credentials", { ...userDate.current ,redirect:false})
        },
        onSuccess: () => {

        },
        onError: (err) => {
            errRef.current="Invalid credentials"
        }
    })



    return (
        <div className={className} >
            <div className=' w-full h-full flex flex-col gap-2 pt-5'>
                <Input onChange={(e) => userDate.current.email = e.target.value} id="email" placeholder="Email" type="email" required className=' bg-white text-black' />
                <Input onChange={(e) => userDate.current.password = e.target.value} id="password" placeholder="Password" type="password" required className=' bg-white text-black' />
                <ErrorField error={errRef.current} />
                <Button onClick={() => mutate()} isLoading={isPending} variant={"none"} className=' bg-primary text-white ' >Login</Button>
                <Button onClick={() => signIn("google")} variant={"secondary"} className='text-black border-2 border-neutral-500/50 mt-5' >
                    <BsGoogle size={20} />
                    Continue with google
                </Button>
                <Button onClick={onClick} variant={"none"} className=' w-max mx-auto text-neutral-500  hover:text-neutral-600' >
                    <p>
                        First time using Otel?
                        <span className="  text-neutral-800  cursor-pointer   hover:underline"> Create an account</span>
                    </p>
                </Button>
            </div>
        </div>
    )
}

export default Login