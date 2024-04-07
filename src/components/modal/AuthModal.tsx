"use client"

import React, { useState } from 'react'
import Modal from './Modal'
import Login from '../auth/Login'
import { twMerge } from 'tailwind-merge'
import Register from '../auth/Register'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_AUTH } from '@/redux/constant'

const AuthModal = () => {

    const dispatch = useDispatch()
    const { openAuth } = useSelector((state: any) => state.toggleReducer)
    const [toggle, setToggle] = useState(false)



    return (
        <Modal open={openAuth} close={() => dispatch({ type: CLOSE_AUTH })} className={twMerge(toggle ? " h-[27rem]" : " h-[24rem]")} header={toggle ? 'Welcome to Otel' : "Welcome back"} description={toggle ? 'Create an account!' : "Login to your account!"} >
            <div className=' w-full flex relative gap-10'>
                <Login onClick={() => setToggle(true)} className={twMerge(" absolute h-full w-full transition-all duration-500 px-5", toggle && " -translate-x-[100%]")} />
                <Register onClick={() => setToggle(false)} className={twMerge("  h-full w-full transition-all duration-500 px-5", !toggle && " translate-x-[100%]")} />
            </div>
        </Modal>
    )
}

export default AuthModal