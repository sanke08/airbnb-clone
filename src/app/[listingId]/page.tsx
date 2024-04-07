import React, { Suspense } from 'react'
import ListingHead from '@/components/ListingHead'
import ListingReservetion from '@/components/ListingReservetion'
import listingModal from '@/lib/modals/listing.modal'
import reservationModal from '@/lib/modals/reservation.modal'
import { Loader } from 'lucide-react'
import ListingInfo from '@/components/ListingInfo'
import { ListingType, ReservationType } from '../../../global.types'
import { eachDayOfInterval } from 'date-fns'

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
    const reservations = await reservationModal.find({ listing: params.listingId, }) as ReservationType[]

    let disabledDates: any[] = []

    reservations.forEach((reservation) => {
        const range = eachDayOfInterval({
            start: (new Date(reservation.startDate)),
            end: (new Date(reservation.endDate)),
        })
        disabledDates = [...disabledDates, ...range]
    })
console.log(disabledDates)

    return (
        <Suspense fallback={<Loader className=' w-10 h-10 m-auto  animate-spin' />} >
            <div className=' py-2 w-full px-0'>
                <ListingHead imgUrl={listing.image} />
                <div className=' flex w-full'>
                    <ListingInfo listing={listing} />
                    <ListingReservetion disabledDates={disabledDates} price={listing.price} reservations={reservations} listingId={params.listingId} />
                </div>
            </div>
        </Suspense>
    )
}

export default page