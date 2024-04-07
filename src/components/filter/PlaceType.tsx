"use client"
import React, { memo, useMemo } from 'react'
import { Button } from '../ui/button'
import { twMerge } from 'tailwind-merge'
import { useDispatch, useSelector } from "react-redux"
import { FTYPE } from '@/redux/constant'




const PlaceType = () => {

    const { type } = useSelector((state: any) => state.filterReducer)
    const dispatch = useDispatch()

    const handleChange = (type: string) => {
        dispatch({ type: FTYPE, payload: type })
    }






    return (
        <div className=' mt-2'>
            <p className=' font-semibold text-2xl'>Type of place</p>
            <p className=' text-sm text-neutral-500'>Search rooms, entire homes or any type of place</p>
            <div className=' border flex w-full justify-between rounded-2xl mt-2 overflow-hidden text-black'>
                <Button onClick={() => handleChange("both")} variant={"none"} className={twMerge(' text-black w-full border rounded-none hover:bg-black/10', (type === "both" || type === undefined) && "bg-rose-500 hover:bg-rose-500 text-white")}>Any type</Button>
                <Button onClick={() => handleChange("room")} variant={"none"} className={twMerge(' text-black w-full border rounded-none hover:bg-black/10', type === "room" && "bg-rose-500 text-white hover:bg-rose-500")}>Room</Button>
                <Button onClick={() => handleChange("home")} variant={"none"} className={twMerge(' text-black w-full border rounded-none hover:bg-black/10', type === "home" && "bg-rose-500 text-white hover:bg-rose-500")}>Home</Button>
            </div>

        </div>
    )
}

export default memo(PlaceType)