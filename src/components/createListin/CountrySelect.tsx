"use client"
import useCountries from '@/hooks/useCountries'
import { LOCATION } from '@/redux/constant'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { twMerge } from 'tailwind-merge'

const CountrySelect = ({ className }: { className: string }) => {

    const dispatch = useDispatch()
    const { location } = useSelector((state: any) => state.listingReducer)


    const { getAll } = useCountries()

    const handleChange = (e: { target: { value: any } }) => {
        dispatch({ type: LOCATION, payload: e.target.value })
    }

    return (

        <div className={twMerge("p-3", className)} >
            <p className=' mt-5 py-1'>Your Location</p>
            <select title='d' value={location} onChange={handleChange} className=' w-full border-2  p-2 rounded-lg transition-all duration-500'>
                <option value="">choose location</option>
                {
                    getAll().map(val => (
                        <option key={val.label} value={val.label}  >
                            {val.label}
                        </option>
                    ))
                }
            </select>

        </div>
    )
}

export default CountrySelect