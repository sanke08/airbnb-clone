import { getUser } from '@/action/getUser'
import ListingCard from '@/components/ListingCard'
import favouriteModal from '@/lib/modals/favourite.modal'
import React, { Suspense } from 'react'
import { FavType, ListingType } from '../../../global.types'
import { Heart } from 'lucide-react'
const page = async () => {

    const user = await getUser()
    if (!user) return (
        <div>
            Unauthorized
        </div>
    )
    const favourites: FavType[] = await favouriteModal.find({ userId: user._id }).populate({ path: "listId", select: "_id price title" })
    if (!favourites) {
        return (
            <div>

            </div>
        )
    }
    return (
        <Suspense fallback={<BoxSkeleton/>} >
            <div className=' font-semibold pt-8 flex items-center py-3'>
                <Heart className=' fill-rose-500 h-20 w-20 text-rose-500' />
                <div>
                    <p  className=' text-2xl'>Your Favourites</p>
                    <p className=' opacity-50'>get your favourite listing</p>
                </div>
            </div>
            <div className=' w-full grid grid-cols-7 gap-5 pb-5'>
                {
                    // @ts-ignore
                    favourites && favourites.map((fav: FavType & { listId: ListingType }) => (
                        <ListingCard key={fav._id} title={fav.listId.title} category={fav.listId.category} price={fav.listId.price} isFav listingId={fav.listId._id} img={fav.listId.image} />
                    ))
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
            </div>
          ))
        }
      </div>
    )
  }