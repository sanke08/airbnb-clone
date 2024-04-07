"use client"
import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import qs from "query-string"




const ShowButton = () => {
    const { amenities, type, price, bedRooms, rooms, bathRooms } = useSelector((state: any) => state.filterReducer)

    useEffect(() => {

    }, [])

    const handle = async () => {
        console.log(price)
        const sq = qs.stringifyUrl({
            url: "/api/listing",
            query: {
                bathRooms, amenities: JSON.stringify(amenities), type, price:JSON.stringify(price), bedRooms, rooms
            }
        })
        console.log(sq)
        const { data } = await axios.get(sq)
        console.log(data)
    }

    return (
        <div onClick={handle}>
            how
        </div>
    )
}

export default ShowButton