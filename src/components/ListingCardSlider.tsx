"use client"

import React from 'react'
import Image from 'next/image'

const ListingCardSlider = () => {
    const images = [
        "https://utfs.io/f/7cd00b98-563d-4efb-a40a-74cdabef5c21-59mbqw.jpg",
        "https://images.unsplash.com/photo-1642425149556-b6f90e946859?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://utfs.io/f/7cd00b98-563d-4efb-a40a-74cdabef5c21-59mbqw.jpg",
    ]




    return (
        <div onScroll={(e) => console.log(e.target)} className=' aspect-square flex w-full relative text-center rounded-xl overflow-scroll  flex-col align-middle snap-x snap-mandatory'>
            {
                images.map((image, i) => (
                    <div key={i} className={` snap-center absolute w-full h-full translate-x-[${100 * i}%]`}>
                        <Image src={image} fill alt='img' loading="eager" />
                    </div>
                ))
            }
        </div>
    )
}

export default ListingCardSlider