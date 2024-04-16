"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../ui/input'
import { DESCRIPTION, TITLE, TYPE } from '@/redux/constant'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { twMerge } from 'tailwind-merge'

const Describe = ({ className }: { className: string }) => {

    const dispatch = useDispatch()
    const { title, description, type } = useSelector((state: any) => state.listingReducer)

    const handleChange = (ty: string) => {
        dispatch({ type: TYPE, payload: ty })
    }


    return (
        <div className={className}>
            <p className=' my-5'>How do you describe your place</p>
            <Input value={title} onChange={(e) => dispatch({ type: TITLE, payload: e.target.value })} placeholder='Title' className=' bg-white text-black border-2 my-5' />
            <Textarea value={description} onChange={(e) => dispatch({ type: DESCRIPTION, payload: e.target.value })} placeholder='Description' className=' bg-white text-black border-2 my-5 h-48 outline-none resize-none' />
            <div className=' mt-2'>
                <p className=' font-semibold text-2xl'>Type of place</p>
                <p className=' text-sm text-neutral-500'>Search rooms, entire homes or any type of place</p>
                <div className=' border flex w-full justify-between rounded-2xl mt-2 overflow-hidden text-black'>
                    {/* <Button onClick={() => handleChange("both")} variant={"none"} className={twMerge(' text-black w-full border rounded-none hover:bg-black/10', (type === "both" || type === undefined) && "bg-rose-500 hover:bg-rose-500 text-white")}>Any type</Button> */}
                    <Button onClick={() => handleChange("room")} variant={"none"} className={twMerge(' text-black w-full border rounded-none hover:bg-black/10', type === "room" && "bg-rose-500 text-white hover:bg-rose-500")}>Room</Button>
                    <Button onClick={() => handleChange("home")} variant={"none"} className={twMerge(' text-black w-full border rounded-none hover:bg-black/10', type === "home" && "bg-rose-500 text-white hover:bg-rose-500")}>Home</Button>
                </div>
            </div>
        </div>
    )
}

export default Describe