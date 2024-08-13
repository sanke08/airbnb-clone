"use client"
import React, { useCallback, useState } from 'react'
import { Button } from './ui/button'
import { twMerge } from 'tailwind-merge'



const Togglebutton = ({ value, onChange }: { value: boolean, onChange: () => void }) => {

    const handle = useCallback(() => {
        onChange()
    }, [onChange])

    return (
        <Button variant={"none"} onClick={handle} className={twMerge(' border-2 rounded-full p-1 h-fit w-12 flex transition-all duration-500 bg-neutral-500 justify-start', value && "bg-black")}>
            <div className={twMerge(' h-5 w-5 bg-white rounded-full transition-all duration-500', value && "translate-x-4 bg-white ")} />
        </Button>
    )
}

export default Togglebutton