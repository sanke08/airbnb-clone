"use client"
import React from 'react'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { PRICE } from '@/redux/constant'

const Price = ({ className }: { className: string }) => {

    const dispatch = useDispatch()
    const { price } = useSelector((state: any) => state.listingReducer)

    return (
        <div className={className}>
            <p className=' p-5'>Now set your price <span className=' text-rose-700'> as per NIGHT</span></p>
            <div className=' flex relative items-center'>
                <p className=' absolute pl-5'>Rs</p>
                <Input value={price} onChange={(e) => dispatch({ type: PRICE, payload: e.target.value })} type="number" className=' pl-10 bg-white text-black border-2' />
            </div>
        </div>
    )
}

export default Price