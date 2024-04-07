"use client"
import React from 'react'
import { categories } from '../Categories'
import { twMerge } from 'tailwind-merge'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CATEGORY } from '@/redux/constant'

const SetCategory = ({ className }: { className: string }) => {

    const dispatch = useDispatch()
    const { category: cat } = useSelector((state: any) => state.listingReducer)

    const handleCategory = (category: string) => {
        dispatch({ type: SET_CATEGORY, payload: category })
    }

    return (
        <div className={className}>
            <p className=' p-1 mt-5'>Categories</p>
            <div className=' w-full grid grid-cols-2 gap-2'>
                {
                    categories.map(category => (
                        <Button onClick={() => handleCategory(category.label)} variant={"outline"} key={category.label} className={twMerge('p-2 rounded-lg text-black font-normal', category.label === cat && "border-2 border-rose-500")}>
                            <category.icon />
                            <p className=' min-w-10'>
                                {category.label}
                            </p>
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}

export default SetCategory