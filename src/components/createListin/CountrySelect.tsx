"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import { Input } from '../ui/input'
import { LOCATION } from '@/redux/constant'

const CountrySelect = ({ className }: { className: string }) => {

    const dispatch = useDispatch()
    const { location } = useSelector((state: any) => state.listingReducer)

    const [details, setDetails] = useState({
        state: location.state || "",
        country: location.country || "",
        street: location.street || "",
        address: location.address || ""
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch({
                type: LOCATION,
                payload: {
                    ...details
                }
            })
        }, 2000);
        return () => {
            clearTimeout(timer)
        }
    }, [details, dispatch])


    return (

        <div className={twMerge("p-3", className)} >
            <p className=' mt-5 py-1'>Your Location</p>
            <div className=' space-y-2'>
                <Input value={details.state} onChange={(e) => setDetails((pre) => ({ ...pre, state: e.target.value }))} placeholder='State' />
                <Input value={details.country} onChange={(e) => setDetails((pre) => ({ ...pre, country: e.target.value }))} placeholder='Country' />
                <Input value={details.street} onChange={(e) => setDetails((pre) => ({ ...pre, street: e.target.value }))} placeholder='Street' />
                <Input value={details.address} onChange={(e) => setDetails((pre) => ({ ...pre, address: e.target.value }))} placeholder='address' />
            </div>
        </div>
    )
}

export default CountrySelect