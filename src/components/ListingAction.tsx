"use client"
import React, { useRef } from 'react'
import { ListingType } from '../../global.types'
import CustomDialogTrigger from './reuse/custom-dialog-trigger'
import { Edit, Trash } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { Button } from './ui/button'
import { DialogClose } from './ui/dialog'
import { useDispatch } from 'react-redux'
import { BATHROOM_CNT, DESCRIPTION, GUEST_CNT, LOCATION, OPEN_ADD_LISTING, PRICE, ROOM_CNT, SET_CATEGORY, TITLE, TYPE, UPDATE_LISTING } from '@/redux/constant'
import ErrorField from './ErrorField'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const ListingAction = ({ listing }: { listing: ListingType }) => {
    
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch({ type: UPDATE_LISTING, payload: listing._id })
        dispatch({ type: OPEN_ADD_LISTING })
        dispatch({ type: SET_CATEGORY, payload: listing.category })
        dispatch({ type: LOCATION, payload: listing.location })
        dispatch({ type: GUEST_CNT, payload: listing.guestCount })
        dispatch({ type: ROOM_CNT, payload: listing.roomCount })
        dispatch({ type: BATHROOM_CNT, payload: listing.bathroomCount })
        dispatch({ type: TITLE, payload: listing.title })
        dispatch({ type: DESCRIPTION, payload: listing.description })
        dispatch({ type: PRICE, payload: listing.price })
        dispatch({ type: TYPE, payload: listing.type })
    }


    return (
        <div className=' w-max space-x-2'>
            <CustomDialogTrigger content={<DeleteButton listingId={listing._id} title={listing.title} createdAt={listing.createdAt} />} header='Remove Listing' description='Delete existing Listing' >
                <Trash className='h-5 w-5 hover:text-primary' />
            </CustomDialogTrigger>
            <Button onClick={handleClick} variant={"none"} className=' hover:text-primary p-1'><Edit className='h-5 w-5' /></Button>
        </div>
    )
}

export default ListingAction


const DeleteButton = ({ listingId, title, createdAt }: { listingId: string, title: string, createdAt: Date }) => {
    const errRef = useRef("")
    const router = useRouter()
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            errRef.current = ""
            const { data } = await axios.delete(`/api/listing/${listingId}`)
            return data
        },
        onSuccess: () => {
            router.refresh()
        },
        onError: ({ response }: { response: { data: { message: string } } }) => {
            errRef.current = response.data.message
        }
    })




    return (
        <div className=' p-5'>
            <div className=' w-full flex justify-between items-center'>
                <p className=' text-2xl text-primary'>
                    {title}
                </p>
                <p className=' text-neutral-400 text-xs'>
                    created at {new Date(createdAt).toLocaleDateString()}
                </p>
            </div>
            <ErrorField error={errRef.current} className=' mt-10' />
            <div className=' w-full flex gap-5 justify-between mt-2'>
                <DialogClose disabled={isPending} className=' w-full border-2 rounded-lg'>
                    Cancle
                </DialogClose>
                <Button onClick={() => mutate()} isLoading={isPending} variant={"none"} className=' w-full bg-primary text-white hover:bg-rose-500/80' ><Trash /> Remove </Button>
            </div>
        </div>
    )
}