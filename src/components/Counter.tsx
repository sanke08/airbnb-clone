"use client"
import React from 'react'
import { Button } from './ui/button'
import { Minus, Plus, PlusCircle } from 'lucide-react'


interface Props {
    value: number,
    onchage: (num: number) => void
}


const Counter = ({ value, onchage }: Props) => {

    const inc = () => {
        onchage(value += 1)
    }

    const dec = () => {
        if (value > 1) {
            onchage(value -= 1)
        }
    }


    return (
        <div className=' flex items-center gap-x-2'>
            <Button onClick={dec} variant={"none"} size={"fit"} className=' rounded-full border-2'>
                <Minus className=' h-5 w-5' />
            </Button>
            {value}
            <Button onClick={inc} variant={"none"} size={"fit"} className=' rounded-full border-2'>
                <Plus className=' h-5 w-5' />
            </Button>

        </div>
    )
}

export default Counter