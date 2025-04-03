"use client"

import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const ListingCardSlider = ({ listingId, img }: { listingId: string, img: Array<string> }) => {

    const [counter, setCounter] = useState(1)

    const images = [...img]

    const moveForward = useCallback(() => {
        if (counter !== images.length)
            setCounter((pre) => pre + 1)
    }, [counter, images.length])


    const moveBackward = useCallback(() => {
        if (counter !== 1)
            setCounter((pre) => pre - 1)
    }, [counter])

    return (

        <div className=' w-full aspect-square h-max relative group overflow-hidden rounded-xl'>
            <Link href={`/${listingId}`}>
                {
                    images.map((image, i) => (
                        <div key={i} className={twMerge(` bg-neutral-500 w-full aspect-square absolute transition-all ease-in-out duration-500 rounded-lg overflow-hidden`,
                            counter > i + 1 && " -translate-x-full",
                            counter < i + 1 && " translate-x-full",
                        )}>
                            <Image src={image} alt='' fill className=' object-cover' />
                        </div>
                    ))
                }
            </Link>

            <Button onClick={() => moveBackward()} className={twMerge(' absolute rounded-full w-max h-max  bg-white hover:bg-white/80 text-black p-1 m-0 flex left-0 top-1/2 -translate-y-1/2 justify-center items-center transition-all duration-300 md:scale-0 -translate-x-full',
                counter !== 1 && " group-hover:translate-x-1 group-hover:scale-100 -translate-x-0"
            )}>
                <ChevronLeft className=' h-6 w-6' />
            </Button>
            <Button onClick={() => moveForward()} className={twMerge(' absolute w-max h-max rounded-full bg-white hover:bg-white/80 text-black p-1 m-0 flex right-0 top-1/2 -translate-y-1/2 justify-center items-center md:translate-x-full transition-all duration-300 md:scale-0',
                counter !== images.length && " group-hover:-translate-x-1 group-hover:scale-100"
            )}>
                <ChevronRight className=' h-6 w-6' />
            </Button>

            <div className=' absolute -bottom-1 py-4 gap-1 flex justify-center bg-gradient-to-t from-neutral-900 w-full items-center'>
                {
                    images.map((image, i) => (
                        <div key={i} className={twMerge(' bg-white/50 h-1 w-1 rounded-full transition-all duration-500',
                            counter === i + 1 && " w-2 h-2 bg-white/80",
                        )}>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default ListingCardSlider