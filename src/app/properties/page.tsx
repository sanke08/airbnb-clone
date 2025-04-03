import { getUser } from '@/action/getUser'
import { db } from '@/lib/db'
import listingModal from '@/lib/modals/listing.modal'
import React, { Suspense } from 'react'
import { ListingType, UserType } from '../../../global.types'
import Image from 'next/image'
import ListingAction from '@/components/ListingAction'
import { BoxSkeleton } from '@/components/BoxSkeleton'




const page = async () => {
    const user: UserType | null = await getUser()
    if (!user) return
    await db()

    const properties: ListingType[] = await listingModal.find({ creator: user._id })

    if (!properties) return (
        <div>
            You Have No Properties
        </div>
    )

    return (
        <Suspense fallback={<BoxSkeleton />} >
            <div className=' xl:px-60 lg:px-44 md:px-14 sm:px-5 pt-20'>
                {
                    properties.map((property) => (
                        <Card key={property._id} listing={property} />
                    ))
                }
            </div>
        </Suspense>
    )
}

export default page




const Card = ({ listing }: { listing: ListingType }) => {
    return (
        <div className=' border-b flex gap-5 items-center py-1 justify-between'>
            <Image src={listing.image[0]} alt='' sizes='100vh' width={0} height={0} className=' w-[5rem] rounded-xl' />
            <p className=' w-[30%]'>{listing.title}</p>
            <p className=' w-[40%]'>Rs. {listing.price} <span className='text-neutral-400 text-xs'>per night</span></p>
            <ListingAction listing={listing} />
        </div>
    )
}
