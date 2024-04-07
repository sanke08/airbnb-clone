import { getUser } from '@/action/getUser'
import ListingCard from '@/components/ListingCard'
import favouriteModal from '@/lib/modals/favourite.modal'
import reservationModal from '@/lib/modals/reservation.modal'
import React, { Suspense } from 'react'
import { ListingType, ReservationType } from '../../../global.types'
import ReservationCard from '@/components/ReservationCard'
import { Loader } from 'lucide-react'
// import { BoxSkeleton } from '../page'

const page = async () => {
    const user = await getUser()
    if (!user) return (
        <div>
            Unauthorized
        </div>
    )
    const reservations: ReservationType[] = await reservationModal.find({ reserver: user._id }).populate({ path: "listing", select: "_id title image category" })
    const favourites = await favouriteModal.find({ userId: user._id })
    if (reservations.length === 0) {
        return (
            <div>
                No reservation
            </div>
        )
    }
    return (
        <Suspense fallback={<BoxSkeleton />}  >
        <div className=' pt-20 font-semibold text-2xl'>My Reservations</div>
            <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 md:px-10 pb-5 gap-4 w-full'>
                {
                    //  @ts-ignore
                    reservations.map((reservation: ReservationType & { listing: ListingType }) => {
                        // @ts-ignore
                        const isFav = favourites.find((fav) => fav.listId.equals(reservation.listing._id))
                        return (
                            <ReservationCard key={reservation._id} reseravtionId={reservation._id} img={reservation.listing.image} startDate={reservation.startDate} endDate={reservation.endDate} listingId={reservation.listing._id} category={reservation.listing.category} price={reservation.totalPrice} title={reservation.listing.title} isFav={!!isFav} />
                        )
                    })
                }
            </div>
        </Suspense>
    )
}

export default page



export const BoxSkeleton = () => {
    return (
        <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-3 my-3 pt-16'>
            {
                [...Array(10)].map((i, j) => (
                    <div key={j} className=' w-full border-2 rounded-lg p-2'>
                        <div className=' bg-neutral-700/50 w-full aspect-square rounded-lg animate-pulse' />
                        <div className=' flex justify-between items-center pt-2 px-2'>
                            <p className=' w-28 py-3 bg-neutral-700/50 animate-pulse rounded-lg' />
                            <p className=' text-xs py-2 bg-neutral-700/50 w-14 animate-pulse rounded-md' />
                        </div>
                        <p className=' p-2 w-20 bg-neutral-700/50 m-2 rounded-lg' />
                        <p className=' w-full rounded-md h-[40px] bg-neutral-400/50 animate-pulse' />
                    </div>
                ))
            }
        </div>
    )
}