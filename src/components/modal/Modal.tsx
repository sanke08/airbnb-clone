"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { twMerge } from 'tailwind-merge'


interface Props {
    children: React.ReactNode
    open: boolean
    close: () => void
    className?: string
    header?: string
    description?: string
}



const Modal = ({ children, open, close, className, header, description }: Props) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
        setTimeout(() => {
            close()
        }, 200);
    }

    useEffect(() => {
        setIsOpen(open)
    }, [open])


    return (
        <div className={twMerge(' h-screen w-screen flex justify-center items-center top-0 left-0 z-50 bg-black/50 ', open ? "fixed" : "hidden")}>
            <div className={twMerge(' sm:w-[35rem] w-[94%] min-h-72 max-h-[95vh] px-5 bg-white border-2 rounded-xl shadow-xl relative transition-all duration-500',
                className, isOpen ? " translate-y-[0%] opacity-100" : " opacity-0 translate-y-[50%]")}>
                <Button onClick={handleClose} variant={"none"} size={"fit"} className=' text-black absolute top-2 right-2' >
                    <X />
                </Button>
                <div className=' font-semibold pt-5 text-2xl'>
                    {header}
                </div>
                <div className=' font-semibold text-sm text-neutral-500'>
                    {description}
                </div>
                <div className=' max-h-[95vh] overflow-y-auto overflow-x-hidden w-full'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal