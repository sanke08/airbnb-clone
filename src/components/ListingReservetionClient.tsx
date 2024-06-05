"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Calender from "@/components/Calender"
import { eachDayOfInterval, format, isBefore } from 'date-fns';
import { useMutation } from '@tanstack/react-query';
import { Button } from './ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Equal, X } from 'lucide-react';
import PopoverComponent from './reuse/popover-component';
import { createReservationRequest } from '@/lib/validator/reservation.validator';
import axios from 'axios';




interface Props {
    price: number
    listingId: string,
    disabledDates: Array<any>
}


const ListingReservetionClient = ({ price,  disabledDates, listingId }: Props) => {


    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()


    const handleStartChange = useCallback((value: Date) => {
        const date = format(value, "dd-MMM-yyy")
        if (searchParams.has("end")) {
            router.replace(`http://localhost:3000/${pathname}?start=${date}&end=${searchParams.get("end")}`)
        } else {
            router.replace(`http://localhost:3000/${pathname}?start=${date}`)
        }
    }, [pathname, router, searchParams])

    const handleEndChange = useCallback((value: Date) => {
        const date = format(value, "dd-MMM-yyy")
        if (searchParams.has("start")) {
            router.replace(`http://localhost:3000/${pathname}?start=${searchParams.get("start")}&end=${date}`)
        } else {
            router.replace(`http://localhost:3000/${pathname}?end=${date}`)
        }
    }, [pathname, router, searchParams])


    const countDays = useMemo(() => {
        if (!searchParams.has("start") || !searchParams.has("end")) return
        return eachDayOfInterval({ start: new Date(searchParams.get("start")), end: new Date(searchParams.get("end")) }).length || 0

    }, [searchParams])

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            if (!searchParams.has("start") || !searchParams.has("end")) return
            const payload: createReservationRequest = {
                listingId,
                startDate: searchParams.get("start"),
                endDate: searchParams.get("end"),
                totalPrice: price * (countDays ?? 0)
            }
            const { data } = await axios.post(`/api/reservation`, payload)
            return data
        },
        onSuccess: () => {
            router.refresh()
        },
        onError: (data) => {
            console.error(data);
        }
    })

    useEffect(() => {
        if (searchParams.get("start") && searchParams.get("end")) {
            if (searchParams.get("start").toString() === searchParams?.get("end").toString()) return
            if (!isBefore(searchParams.get("start"), searchParams.get("end"))) {
                router.replace(`http://localhost:3000/${pathname}?start=${searchParams.get("end")}`)
            }
        }
    }, [pathname, router, searchParams])


    const isDisabledDate = useCallback((date: Date) => {
        return disabledDates.some((disDate: Date) => {
            return (
                date.getMonth() === disDate.getMonth() &&
                date.getDate() === disDate.getDate() &&
                date.getFullYear() === disDate.getFullYear()
            )
        })
    }, [disabledDates])

    useEffect(() => {
        if (searchParams.has("start") && searchParams.has("end")) {
            const range = eachDayOfInterval({
                start: new Date(searchParams.get("start")),
                end: new Date(searchParams.get("end"))
            })

            const isDisabled = range.some((date) => isDisabledDate(date))
            if (isDisabled) {
                router.replace(`http://localhost:3000/${pathname}?start=${searchParams.get("end")}`)
            }
        }
    }, [pathname, router, searchParams])





    return (
        <div className="rounded-xl sticky h-full w-[26em] top-20 p-3 px-5  shadow m-2 border-2 border-neutral-300 overflow-hidden gap-20">

            <PopoverComponent className=' w-max h-max bg-white' content={
                <div className=' flex gap-2'>
                    <Calender
                        onChange={handleStartChange}
                        selected={`${searchParams.get("start")}`}
                        title='Check-in'
                        disabledDates={disabledDates}
                    />
                    <Calender
                        onChange={handleEndChange}
                        selected={`${searchParams.get("end")}`}
                        className=' border-l border-neutral-400/50 pl-2'
                        title='Check-out'
                        disabledDates={disabledDates}
                    />
                </div>
            }>
                <div className=' bg-black/5 hover:bg-black/10 border border-black/50 flex w-full justify-between py-2 rounded-lg'>
                    <div className='w-full px-4'>
                        Check-In
                        <p>
                            {searchParams.get("start")}
                        </p>
                    </div>
                    <div className='w-full border-l border-neutral-400 px-4'>
                        Chech-Out
                        <p>
                            {searchParams.get("end")}
                        </p>
                    </div>

                </div>
            </PopoverComponent>

            <div className=" flex flex-col w-full mt-4" >
                <Button onClick={() => mutate()} isLoading={isPending} variant={"none"} className=' w-full bg-primary text-white' >Reserve</Button>
                {
                    countDays &&
                    <div className=' flex gap-1 mt-4 items-center text-neutral-600 font-bold justify-between  w-full'>
                        <div className='flex gap-x-1 items-center'>
                            <span>Rs. {price} </span>
                            <X className=' h-4 w-4' />
                            <span>{countDays} days </span>
                        </div>
                        <Equal />
                        <div className=''>
                            Rs. {price * countDays}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ListingReservetionClient


