import React from 'react'
import LikeButton from './listingActionButton/LikeButton'
import ListingCardSlider from './ListingCardSlider'
import {} from "date-fns"

const ListingCard = ({ isFav, listingId, title, category, price,createdAt,img }: { isFav: boolean, listingId: string, img: string, title: string, category: string, price: number,createdAt:Date }) => {

    return (
        <div className=' w-full relative transition-all overflow-x-hidden duration-500 pb-3'>
            <ListingCardSlider listingId={listingId} img={img}/>
            <LikeButton listingId={listingId} isFav={isFav} className=' right-3 top-3' />
            <div className=''>
                <div className=' flex justify-between items-center pt-1 px-2'>
                    <p className=' font-semibold text-lg'>{title} </p>
                    <p className=' text-xs'>{category} </p>
                </div>
                <p> </p>
                <p className=' px-2'>{price} Rs/night </p>
            </div>
        </div>
    )
}

export default ListingCard