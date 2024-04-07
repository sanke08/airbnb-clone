"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Counter from '../Counter'
import { BATHROOM_CNT, GUEST_CNT, ROOM_CNT } from '@/redux/constant'

const Rooms = ({ className }: { className: string }) => {

    const dispatch = useDispatch()
    const { bathrooms, guests, rooms } = useSelector((state: any) => state.listingReducer)

    const handleGuestCnt = (val: number) => {
        dispatch({ type: GUEST_CNT, payload: val })
    }
    const handleRooms=(val:number)=>{
        dispatch({ type: ROOM_CNT, payload: val })
    }
    const handleBathRooms=(val:number)=>{
        dispatch({ type: BATHROOM_CNT, payload: val })
    }



    return (
        <div className={className} >
            <p className=' mt-5 pb-5 pl-5 font-semibold'>Share some basic about your place</p>
            <div className=' w-full px-10 flex flex-col gap-y-5'>
                <div className=' flex justify-between items-center'>
                    <div>
                        <p>Guests</p>
                        <p className=' text-xs text-neutral-500'>How many guest do you allow</p>
                    </div>
                    <Counter value={guests} onchage={(val) => handleGuestCnt(val)} />
                </div>
                <p className=' w-full h-[0.1rem] bg-neutral-500/20 rounded-full' />
                <div className=' flex justify-between items-center'>
                    <div>
                        <p>Rooms</p>
                        <p className=' text-xs text-neutral-500'>How many rooms do you have</p>
                    </div>
                    <Counter value={rooms} onchage={(val) => handleRooms(val)} />
                </div>
                <p className=' w-full h-[0.1rem] bg-neutral-500/20 rounded-full' />
                <div className=' flex justify-between items-center'>
                    <div>
                        <p>Bathrooms</p>
                        <p className=' text-xs text-neutral-500'>How many Bathrooms do you have</p>
                    </div>
                    <Counter value={bathrooms} onchage={(val) => handleBathRooms(val)} />
                </div>

            </div>
        </div>
    )
}

export default Rooms