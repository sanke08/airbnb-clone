"use client"

import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const ListingCardSlider = ({ listingId }: { listingId: string }) => {

    const [counter, setCounter] = useState(1)

    const images = [
        "https://utfs.io/f/7cd00b98-563d-4efb-a40a-74cdabef5c21-59mbqw.jpg",
        "https://images.unsplash.com/photo-1642425149556-b6f90e946859?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://utfs.io/f/7cd00b98-563d-4efb-a40a-74cdabef5c21-59mbqw.jpg",
    ]

    const moveForward = useCallback(() => {
        if (counter !== images.length)
            setCounter((pre) => pre + 1)
    }, [counter, images.length])


    const moveBackward = useCallback(() => {
        if (counter !== 1)
            setCounter((pre) => pre - 1)
    }, [counter])


    return (
        <div className=' w-full relative overflow-hidden aspect-square group '>
            <Link href={`/${listingId}`}>
                {
                    images.map((image, i) => (
                        <div key={i} className={twMerge(` bg-neutral-500 w-full h-full absolute transition-all ease-in-out duration-500 rounded-lg overflow-hidden`,
                            counter > i + 1 && " -translate-x-full",
                            counter < i + 1 && " translate-x-full",
                        )}>
                            <Image src={image} alt='' fill className=' object-cover' />
                        </div>
                    ))
                }
            </Link>

            <Button onClick={() => moveBackward()} className={twMerge(' absolute w-[20%] p-0 m-0 h-full flex left-0 bg-gradient-to-r from-neutral-900/20  hover:from-neutral-500/10 to-white/0 justify-center items-center -translate-x-full transition-all duration-300', "group-hover:translate-x-0")}>
                <ChevronLeft className=' h-8 w-8' />
            </Button>
            <Button onClick={() => moveForward()} className={twMerge(' absolute w-[20%] p-0 m-0 h-full flex right-0 bg-gradient-to-l from-neutral-900/20  hover:from-neutral-500/10 to-white/0 justify-center items-center translate-x-full transition-all duration-300', "group-hover:translate-x-0")}>
                <ChevronRight className=' h-8 w-8' />
            </Button>
        </div >
    )
}

export default ListingCardSlider