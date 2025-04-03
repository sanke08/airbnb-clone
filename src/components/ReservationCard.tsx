"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LikeButton from './listingActionButton/LikeButton'
// import img from "../../public/1.jpg"
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'



interface Props {
    isFav: boolean
    listingId: string
    img: string
    title: string
    category: string
    price: number
    startDate: Date
    endDate: Date
    reseravtionId: string
}


const ReservationCard = ({ isFav, listingId, title, category, price, startDate, endDate, reseravtionId, img }: Props) => {
    const router = useRouter()
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.delete(`/api/reservation/${reseravtionId}`)
            return data
        },
        onSuccess: () => {
            router.refresh()
        },
        onError: () => {

        }
    })



    return (
        <div className=' w-full border overflow-hidden relative rounded-lg p-2 bg-neutral-100 hover:bg-neutral-200 transition-all duration-500'>
            <Link href={`/${listingId}`}>
                <div className=' relative  w-full flex justify-center aspect-square rounded-lg overflow-hidden'>
                    <Image src={img} alt='' fill className=' hover:scale-110 transition-all duration-300 aspect-square' />
                </div>
            </Link>
            <Link href={"/f"} >
                <div className=' flex justify-between items-center pt-2'>
                    <p>{title} </p>
                    <p className=' text-xs'>{category} </p>
                </div>
                <p className=''>Rs.{price} </p>
                <div className=' text-neutral-600/80 text-xs py-1'>
                    {new Date(startDate).toLocaleDateString()}-{new Date(endDate).toLocaleDateString()}
                </div>
            </Link>
            <Button onClick={() => mutate()} isLoading={isPending} disabled={new Date(Date.now()) > new Date(startDate)} variant={"primary"} className=' bg-primary w-full hover:bg-rose-600/80' >
                {
                    new Date(Date.now()) > new Date(startDate) ?
                        <>
                            cant Cancel
                        </>
                        :
                        <>
                            Cancel reservation

                        </>
                }

            </Button>
            <LikeButton listingId={listingId} isFav={isFav} className=' right-3 top-3' />
        </div>
    )
}

export default ReservationCard