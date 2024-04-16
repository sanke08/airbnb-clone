import React from 'react'
import LikeButton from './listingActionButton/LikeButton'
import Link from 'next/link'
import ListingCardSlider from './ListingCardSlider'


const ListingCard = ({ isFav, listingId, title, category, price }: { isFav: boolean, listingId: string, img: string, title: string, category: string, price: number }) => {

    return (
        <div className=' w-full overflow-hidden relative rounded-xl transition-all duration-500 pb-3'>
            <Link href={`/${listingId}`} prefetch={false}>
                <ListingCardSlider />
            </Link>
            <Link href={`/${listingId}`}>
                <div className=' flex justify-between items-center pt-1 px-2'>
                    <p className=' font-semibold text-lg'>{title} </p>
                    <p className=' text-xs'>{category} </p>
                </div>
                <p className=' px-2'>{price} Rs/night </p>
            </Link>
            <LikeButton listingId={listingId} isFav={isFav} className=' right-3 top-3' />
        </div>
    )
}

export default ListingCard