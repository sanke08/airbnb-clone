import Categories from '@/components/Categories'
import ListingCard from '@/components/ListingCard'
import { db } from '@/lib/db'
import listingModal from '@/lib/modals/listing.modal'
import React, { Suspense } from 'react'
import { ListingType } from '../../global.types'
import favouriteModal from '@/lib/modals/favourite.modal'
import { getUser } from '@/action/getUser'
import Togglebutton from '@/components/Togglebutton'

const page = async ({ searchParams }: { searchParams: { category: string } }) => {
  await db()
  const user = await getUser()
  const listings: ListingType[] = searchParams.category ? await listingModal.find({ category: searchParams.category }) : await listingModal.find()
  const favourites = user ? await favouriteModal.find({ userId: user._id }) : []
  return (
    <div className='w-full'>
      <Suspense fallback={<BoxSkeleton />}  >
        {
          listings.length ?
            <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-5 my-3'>
              {
                listings && listings.map(listing => {
                  const isFav = favourites.find((fav) => fav.listId.equals(listing._id))
                  return (
                    <ListingCard key={listing._id} img={listing.image} listingId={listing._id} category={listing.category} price={listing.price} title={listing.title} isFav={!!isFav} />
                  )
                }
                )
              }
            </div>
            :
            <p className='  text-2xl text-neutral-500 mx-auto w-max mt-10'>No Listing Found</p>
        }
      </Suspense>
      {/* <ListingCardSlider /> */}
      {/* <Togglebutton/> */}
    </div>
  )
}

export default page

export const BoxSkeleton = () => {
  return (
    <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-3 my-3'>
      {
        [...Array(10)].map((i, j) => (
          <div key={j} className=' w-full border-2 rounded-lg p-2'>
            <div className=' bg-neutral-700/50 w-full aspect-square rounded-lg animate-pulse' />
            <div className=' flex justify-between items-center pt-2 px-2'>
              <p className=' w-28 py-3 bg-neutral-700/50 animate-pulse rounded-lg' />
              <p className=' text-xs py-2 bg-neutral-700/50 w-14 animate-pulse rounded-md' />
            </div>
            <p className=' p-2 w-20 bg-neutral-700/50 m-2 rounded-lg' />
          </div>
        ))
      }
    </div>
  )
}



