"use client"
import React, { useRef, useState } from 'react'
import Modal from './Modal'
import SetCategory from '../createListin/SetCategory'
import { twMerge } from 'tailwind-merge'
import { Button } from '../ui/button'
import CountrySelect from '../createListin/CountrySelect'
import Rooms from '../createListin/Rooms'
import Describe from '../createListin/Describe'
import Price from '../createListin/Price'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAN_UP, CLOSE_ADD_LISTING } from '@/redux/constant'
import HotelImage from '../createListin/HotelImage'
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { createListingRequest } from '@/lib/validator/listing.validator'
import ErrorField from '../ErrorField'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'


const CreateListingModal = () => {

    const dispatch = useDispatch()
    const { openListin } = useSelector((state: any) => state.toggleReducer)
    const { category, location, bathrooms, guests, rooms, title, description, price } = useSelector((state: any) => state.listingReducer)
    const { create, update, _id, } = useSelector((state: any) => state.actionReducer)
    const errRef = useRef("")
    const [step, setStep] = useState(4)
    const checkRef = useRef(false)
    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const payload: createListingRequest = {
                category, location, bathroomCount: bathrooms, guestCount: guests, roomCount: rooms, title, description, price, image: "hh"
            }
            if (create) {
                const { data } = await axios.post(`/api/listing`, payload)
                return data
            }
            if (update && _id) {
                const { data } = await axios.put(`/api/listing/${_id}`, payload)
                return data
            }
        },
        onSuccess: (data) => {
            dispatch({ type: CLOSE_ADD_LISTING })
            router.refresh()
        },
        onError: ({ response }: { response: { data: { message: string } } }) => {
            errRef.current = response.data.message
        }

    })

    const handleClose = () => {
        if (isPending) return
        dispatch({ type: CLOSE_ADD_LISTING });
        if (!checkRef.current) {
            dispatch({ type: CLEAN_UP })
            setStep(1)
        }
    }

    return (
        <Modal close={handleClose} open={openListin} header='Create Listing' description='rent your hotel'>

            <div className={twMerge(' flex relative transition-all duration-500', step === 1 && "h-[28rem]", step === 2 && "h-[10rem]", step === 3 && "h-[20rem]", step === 4 && "h-[20rem]", step === 5 && "h-[10rem]", step === 6 && "h-[20em]")}>
                <SetCategory className={twMerge(' overflow-hidden w-full h-full transition-all duration-1000', step < 1 && `translate-x-[200%]`, step > 1 && "-translate-x-[200%]")} />
                <CountrySelect className={twMerge('absolute w-full h-full transition-all duration-1000', step < 2 && `translate-x-[200%]`, step > 2 && "-translate-x-[200%]")} />
                <Rooms className={twMerge('absolute overflow-hidden w-full h-full transition-all duration-1000', step < 3 && `translate-x-[200%]`, step > 3 && "-translate-x-[200%]")} />
                <Describe className={twMerge('absolute overflow-hidden w-full h-full transition-all duration-1000', step < 4 && `translate-x-[200%]`, step > 4 && "-translate-x-[200%]")} />
                <Price className={twMerge('absolute overflow-hidden w-full h-full transition-all duration-1000', step < 5 && `translate-x-[200%]`, step > 5 && "-translate-x-[200%]")} />
                <HotelImage className={twMerge('absolute overflow-hidden w-full h-full transition-all duration-1000', step < 6 && `translate-x-[200%]`, step > 6 && "-translate-x-[200%]")} />
            </div>
            <div className=' flex gap-1 items-center w-full justify-end px-5'>
                <label htmlFor='check' className=' cursor-pointer'>save as draft</label>
                <Input onChange={(e) => checkRef.current = e.target.checked} id="check" type="checkbox" className=' w-max cursor-pointer' />
            </div>
            <div className=' flex gap-x-5 px-3 w-full'>
                {
                    step > 1 &&
                    <Button disabled={isPending} onClick={() => setStep((pre) => step > 1 ? pre - 1 : 1)} variant={"none"} className=' w-full border-2'>Back</Button>
                }
                {
                    step < 6 ?
                        <Button disabled={isPending} onClick={() => setStep((pre) => pre + 1)} variant={"none"} className='w-full bg-primary text-white overflow-hidden'>Next</Button>
                        :
                        <Button isLoading={isPending} onClick={() => mutate()} variant={"ghost"} className='w-full bg-primary text-white overflow-hidden'>
                            {
                                create ?
                                    <>create</> : <>update</>
                            }
                        </Button>
                }
            </div>
            <ErrorField error={errRef.current} className=' pb-7' />
        </Modal>
    )
}

export default CreateListingModal