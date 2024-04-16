import React, { Suspense } from 'react'
import ListingHead from '@/components/ListingHead'
import listingModal from '@/lib/modals/listing.modal'
import { Loader } from 'lucide-react'
import ListingInfo from '@/components/ListingInfo'
import { ListingType } from '../../../global.types'
import ListingReservationServer from '@/components/ListingReservationServer'

const page = async ({ params }: { params: { listingId: string } }) => {
    if (!params.listingId || params.listingId === "undefined") return (
        <div></div>
    )

    type listingType = ListingType & { creator: { _id: string, name: string, image: string } }

    const listing = await listingModal.findById(params?.listingId)?.populate({ path: "creator", select: "_id name image" }) as listingType

    if (!listing) return (
        <div>
            not found
        </div>
    )



    return (
        <div className=' py-2 w-full px-0'>
            <Suspense fallback={<p className=' bg-blue-500 w-20 h-20 animate-spin' />}>
                <ListingHead imgUrl={`${listing.image}`} />
            </Suspense>
            <div className=' flex w-full'>
                <Suspense fallback={<Loader className=' w-10 h-10 m-auto  animate-spin' />} >
                    <ListingInfo listing={listing} />
                </Suspense>
                <Suspense fallback={<p className=' w-20 h-20 border-t-4 animate-spin' />}>
                    <ListingReservationServer listingId={`${listing._id}`} price={listing.price} />
                </Suspense>
            </div>
        </div>
    )
}

export default page