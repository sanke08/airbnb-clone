"use client"
import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import qs from "query-string"
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'




const ShowButton = () => {
    const { amenities, type, price, bedRooms, rooms, bathRooms } = useSelector((state: any) => state.filterReducer)
    const [listings, setListings] = useState()
    const router = useRouter()

    const handleNav = useCallback(() => {
        const url = qs.stringifyUrl({
            url: "/",
            query: {
                bathRooms, type, minimum: price.minimum, maximum: price.maximum, bedRooms, rooms
            }
        })
        router.push(url)
    }, [bathRooms, bedRooms, price, rooms, router, type])



    useEffect(() => {
        const sq = qs.stringifyUrl({
            url: "/api/listing",
            query: {
                bathRooms, amenities: JSON.stringify(amenities), type, price: JSON.stringify(price), bedRooms, rooms
            }
        })
        if (!amenities && !type.length && !price && !bedRooms && !rooms && !bathRooms) return
        const timer = setTimeout(async () => {
            const { data } = await axios.get(sq)
            setListings(data.items)
            console.log(data.items)
        }, 2000);
        return () => {
            clearTimeout(timer)
        }
    }, [amenities, bathRooms, bedRooms, price, rooms, type])

    return (
        <div className=' w-full flex justify-end py-4'>
        <Button onClick={handleNav}  className=' bg-black text-white  gap-5 hover:bg-black hover:text-white border-2 hover:border-rose-500'>
            {listings} Show
        </Button>
        </div>
    )
}

export default ShowButton