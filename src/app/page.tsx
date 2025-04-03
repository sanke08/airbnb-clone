import ListingCard from '@/components/ListingCard'
import { db } from '@/lib/db'
import listingModal from '@/lib/modals/listing.modal'
import React, { Suspense } from 'react'
import { ListingType } from '../../global.types'
import favouriteModal from '@/lib/modals/favourite.modal'
import { getUser } from '@/action/getUser'
import { BoxSkeleton } from '@/components/BoxSkeleton'


interface Props {
  searchParams: {
    category: string | null,
    roomCount: string | null,
    bathroomCount: string | null,
    bedRooms: string | null,
    minimum: string | null,
    maximum: string | null,
    type: "room" | "both" | "home" | null,
  }
}

const page = async ({ searchParams }: Props) => {
  const filter: any = {}

  if (searchParams.roomCount) filter.roomCount = { $gte: parseInt(searchParams.roomCount) }
  if (searchParams.bathroomCount) filter.bathroomCount = { $gte: parseInt(searchParams.bathroomCount) }
  if (searchParams.bedRooms) filter.bedRoomCount = { $gte: parseInt(searchParams.bedRooms) }
  if (searchParams.type && searchParams.type !== "both") filter.type = searchParams.type
  if (searchParams.minimum) filter.price = { $gte: searchParams.minimum, ...filter.price }
  if (searchParams.maximum) filter.price = { $lte: searchParams.maximum, ...filter.price }
  if (searchParams.category) filter.category = searchParams.category


  await db()
  const listings: ListingType[] = await listingModal.find(filter)
  const user = await getUser()
  const favourites = user ? await favouriteModal.find({ userId: user._id }) : []
  return (
    <div className='w-full'>
      <Suspense fallback={<BoxSkeleton />}  >
        {
          listings.length ?
            <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 my-3'>
              {
                listings && listings.map(listing => {
                  const isFav = favourites.find((fav) => fav.listId.equals(listing._id))
                  return (
                    <ListingCard key={listing._id} img={listing.image} listingId={`${listing._id}`} category={listing.category} price={listing.price} title={listing.title} isFav={!!isFav} />
                  )
                }
                )
              }
            </div>
            :
            <p className='  text-2xl text-neutral-500 mx-auto w-max mt-10'>No Listing Found</p>
        }
      </Suspense>
    </div>
  )
}

export default page



