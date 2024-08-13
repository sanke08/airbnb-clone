"use client"
import React, { memo, useCallback } from 'react'
import { Button } from '../ui/button'
import { twMerge } from 'tailwind-merge'
import { useDispatch, useSelector } from 'react-redux'
import { FBATHROOMS, FBEDROOMS, FROOMS } from '@/redux/constant'





const Itentials = () => {


    const { bedRooms, rooms, bathRooms } = useSelector((state: any) => state.filterReducer)
    const dispatch = useDispatch()


    const onChangeBedRooms = useCallback((no: number | undefined) => {
        dispatch({ type: FBEDROOMS, payload: no })
    }, [dispatch])

    const onChangeRooms = useCallback((no: number | undefined) => {
        dispatch({ type: FROOMS, payload: no })
    }, [dispatch])

    const onChangeBathRooms = useCallback((no: number | undefined) => {
        dispatch({ type: FBATHROOMS, payload: no })
    }, [dispatch])




    return (
        <div className=' mt-6'>
            <p className=' font-semibold text-2xl'>Rooms and beds</p>
            <div>
                <div>
                    <p>Bedrooms</p>
                    <Counter onChange={onChangeBedRooms} value={bedRooms} />
                </div>
                <div>
                    <p>Rooms</p>
                    <Counter onChange={onChangeRooms} value={rooms} />
                </div>
                <div>
                    <p>Bathrooms</p>
                    <Counter onChange={onChangeBathRooms} value={bathRooms} />
                </div>
            </div>

        </div>
    )
}

export default memo(Itentials)


// @ts-ignore
const Counter = ({ onChange, value }) => {
    return (
        <div className=' space-x-4'>
            <Button variant={"none"} onClick={() => onChange(undefined)} className={twMerge(' border border-neutral-300 hover:border-black', value == undefined && "bg-black text-white")}>Any</Button>
            {
                [...Array(5)].map((i, j) => (
                    <Button variant={"none"} onClick={() => onChange(j + 1)} className={twMerge(' border border-neutral-300 hover:border-black', value === j + 1 && "bg-black text-white")} key={j}>{j + 1} </Button>
                ))
            }
        </div>
    )
}