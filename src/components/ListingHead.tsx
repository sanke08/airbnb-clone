import React from 'react'
import img from "../../public/1.jpg"
import Image from 'next/image'



interface Props {

    imgUrl:string
}


const ListingHead = ({ imgUrl }: Props) => {
    return (
        <div className='w-full '>
            <Image src={img} alt='' className='w-[100%] h-[40rem] rounded-xl object-cover' />
        </div>
    )
}

export default ListingHead