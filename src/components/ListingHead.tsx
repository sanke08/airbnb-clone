import React from 'react'
import Image from 'next/image'



interface Props {

    imgUrl: string[]
}

const images = [
    "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://utfs.io/f/7cd00b98-563d-4efb-a40a-74cdabef5c21-59mbqw.jpg",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1642425149556-b6f90e946859?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

const ListingHead = ({ imgUrl }: Props) => {
    return (
        <div className='w-full flex relative md:h-[60vh] h-[30vh] gap-1'>
            <div className="w-full h-full overflow-x-auto snap-x snap-mandatory">
                <div className="flex gap-3 w-full h-full">
                    {imgUrl.map((image, index) => (
                        <div key={image} className="relative w-[90%] h-full flex-shrink-0 snap-start">
                            <Image src={image} alt="" fill className="rounded-lg object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListingHead