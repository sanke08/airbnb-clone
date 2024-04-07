"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface Props {
    className?: string
    listingId: string
    isFav: boolean
}


const LikeButton = ({ className, listingId, isFav }: Props) => {
    const [isLike, setIsLike] = useState(isFav)

    const { mutate } = useMutation({
        mutationFn: async () => {
            setIsLike((pre) => !pre)
            const { data } = await axios.patch(`/api/favourites?listId=${listingId}`, {})
            return data
        },
        onSuccess: async () => {
            try {
                await axios.get(`/api/favourites?listId=${listingId}`)
            } catch (error) {
                setIsLike(false)
            }
        },
        onError: () => {
            setIsLike(false)

        }
    })


    return (
        <Button onClick={() => mutate()} size={"fit"} variant={"none"} className={twMerge('absolute rounded-full z-10', className)}>
            <Heart className={twMerge('text-white', isLike && " text-rose-500 fill-rose-500")} />
        </Button>
    )
}

export default LikeButton