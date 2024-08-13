"use client"
import React, { useRef } from 'react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { createListingRequest } from '@/lib/validator/listing.validator'
import axios from 'axios'
import { CLOSE_ADD_LISTING } from '@/redux/constant'
import { useRouter } from 'next/navigation'
import ErrorField from '../ErrorField'

interface Props {
    step: number
    onChangeStep: (no: number) => void
}

const BottomButtons = ({ step, onChangeStep }: Props) => {

    const dispatch = useDispatch()
    const router = useRouter()
    const errRef = useRef("")

    const { category, location, bathrooms, guests, rooms, title, description, price, type, images } = useSelector((state: any) => state.listingReducer)
    const { create, update, _id, } = useSelector((state: any) => state.actionReducer)
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const payload: createListingRequest = {
                category, location: JSON.stringify(location), bathroomCount: bathrooms, guestCount: guests, roomCount: rooms, title, description, price, image: "hh", type
            }
            if (create) {
                const { data } = await axios.post(`/api/listing`, {...payload,images})
                return data
            }
            if (update && _id) {
                const { data } = await axios.put(`/api/listing/${_id}`, {...payload,images})
                return data
            }
        },
        onSuccess: (data) => {
            dispatch({ type: CLOSE_ADD_LISTING })
            router.refresh()
            onChangeStep(1)
        },
        onError: ({ response }: { response: { data: { message: string } } }) => {
            errRef.current = response.data.message
        }

    })


    return (
        <div>
            <div className=' flex gap-x-5 w-full'>
                {
                    step > 1 &&
                    <Button disabled={isPending} onClick={() => onChangeStep(step > 1 ? step - 1 : 1)} variant={"none"} className=' w-full border-2'>Back</Button>
                }
                {
                    step < 6 ?
                        <Button disabled={isPending} onClick={() => onChangeStep(step + 1)} variant={"none"} className='w-full bg-black text-white overflow-hidden'>Next</Button>
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
        </div>
    )
}

export default BottomButtons