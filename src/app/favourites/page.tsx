import { getUser } from '@/action/getUser'
import ListingCard from '@/components/ListingCard'
import favouriteModal from '@/lib/modals/favourite.modal'
import React, { Suspense } from 'react'
import { FavType, ListingType } from '../../../global.types'
import { Heart } from 'lucide-react'
import { BoxSkeleton } from '@/components/BoxSkeleton'
const page = async () => {

  const user = await getUser()
  if (!user) return (
    <div>
      Unauthorized
    </div>
  )
  const favourites: FavType[] = await favouriteModal.find({ userId: user._id }).populate({ path: "listId", select: "_id price title image" })
  if (!favourites)
    return (
      <div>
        Add Your Favourite
      </div>
    )

  return (
    <Suspense fallback={<BoxSkeleton />} >
      <div className=' font-semibold pt-8 flex items-center py-3'>
        <Heart className=' fill-rose-500 h-20 w-20 text-rose-500' />
        <div>
          <p className=' text-2xl'>Your Favourites</p>
          <p className=' opacity-50'>get your favourite listing</p>
        </div>
      </div>
      <div className=' w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-5 xl:grid-cols-7 gap-5 pb-5'>
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


