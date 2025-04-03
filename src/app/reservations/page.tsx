import { getUser } from '@/action/getUser'
import favouriteModal from '@/lib/modals/favourite.modal'
import reservationModal from '@/lib/modals/reservation.modal'
import React, { Suspense } from 'react'
import { ListingType, ReservationType } from '../../../global.types'
import ReservationCard from '@/components/ReservationCard'
import { Loader } from 'lucide-react'
import { BoxSkeleton } from '@/components/BoxSkeleton'

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
                        const isFav = favourites.find((fav) => fav.listId.equals(reservation.listing?._id))
                        return (
                            <ReservationCard key={reservation._id} reseravtionId={reservation._id} img={reservation.listing?.image[0]} startDate={reservation.startDate} endDate={reservation.endDate} listingId={reservation.listing?._id} category={reservation.listing?.category} price={reservation.totalPrice} title={reservation.listing?.title} isFav={!!isFav} />
                        )
                    })
                }
            </div>
        </Suspense>
    )
}

export default page


