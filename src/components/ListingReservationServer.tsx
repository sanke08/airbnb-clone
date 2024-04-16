import reservationModal from '@/lib/modals/reservation.modal'
import React, { Suspense } from 'react'
import { ReservationType } from '../../global.types'
import { eachDayOfInterval } from 'date-fns'
import ListingReservetionClient from './ListingReservetionClient'

interface Prosp {
    listingId: string
    price: number
}



const ListingReservationServer = async ({ listingId, price }: Prosp) => {

    const reservations = await reservationModal.find({ listing: listingId, }) as ReservationType[]

    let disabledDates: any[] = []

    reservations.forEach((reservation) => {
        const range = eachDayOfInterval({
            start: (new Date(reservation.startDate)),
            end: (new Date(reservation.endDate)),
        })
        disabledDates = [...disabledDates, ...range]
    })


    return (
        <Suspense fallback={<p className=' text-black'>Loading</p>}>
        <ListingReservetionClient disabledDates={disabledDates} price={price} listingId={listingId} />
        </Suspense>
    )
}

export default ListingReservationServer