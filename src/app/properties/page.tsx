import { getUser } from '@/action/getUser'
import { db } from '@/lib/db'
import listingModal from '@/lib/modals/listing.modal'
import React, { Suspense } from 'react'
import { ListingType, UserType } from '../../../global.types'
import img from "../../../public/1.jpg"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Edit, Loader, Trash } from 'lucide-react'
import ListingAction from '@/components/ListingAction'




const page = async () => {
    const user: UserType | null = await getUser()
    if (!user) return
    await db()

    const properties: ListingType[] = await listingModal.find({ creator: user._id })

    if (!properties) return

    return (
        <Suspense fallback={<Loader className=' w-32 h-32 animate-spin' />} >

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
            <Image src={img} alt='' className=' w-[5rem] rounded-xl' />
            <p className=' w-[30%]'>{listing.title}</p>
            <p className=' w-[40%]'>Rs. {listing.price} <span className='text-neutral-400 text-xs'>per night</span></p>
            <ListingAction listing={listing} />
        </div>
    )
}