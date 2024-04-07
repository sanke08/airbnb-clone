"use client"
import React, { memo, useEffect } from 'react'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { FPRICE } from '@/redux/constant'

const PriceRange = () => {

    const { price } = useSelector((state: any) => state.filterReducer)
    const dispatch = useDispatch()


    const handleMinimum = (e) => {
        dispatch({ type: FPRICE, payload: { minimum: e.target.value } })
    }
    const handleMaximum = (e) => {
        dispatch({ type: FPRICE, payload: { maximum: e.target.value } })
    }



    return (
        <div className=' mt-6'>
            <p className=' font-semibold text-2xl'>Price range</p>
            <p className=' text-sm text-neutral-500'>price suitable for your</p>
            <div className=' flex gap-x-6 mt-2 w-full'>
                <div className=' border-2  border-neutral-400 rounded-xl overflow-hidden p-2 px-4 flex flex-col w-full h-max'>
                    <label htmlFor='minimum' className=' text-sm text-neutral-600 cursor-pointer'>Minimum</label>
                    <div className=' flex items-center w-full h-max'>
                        <p className='text-lg'>Rs.</p>
                        <Input value={price.minimum} id='minimum' type="number" onChange={handleMinimum} className=' bg-white w-full text-lg text-black border-none h-fit p-0 pl-1' />
                    </div>
                </div>
                <div className=' border-2  border-neutral-400 rounded-xl overflow-hidden p-2 px-4 flex flex-col w-full h-max'>
                    <label htmlFor='maximum' className=' text-sm text-neutral-600 cursor-pointer'>Maximum</label>
                    <div className=' flex items-center w-full h-max'>
                        <p className='text-lg'>Rs.</p>
                        <Input value={price.maximum} id='maximum' onChange={handleMaximum} type="number" className=' bg-white w-full text-lg text-black border-none h-fit p-0 pl-1' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(PriceRange)