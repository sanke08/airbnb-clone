import { Home, ShowerHead, Users } from 'lucide-react'
import React from 'react'
import { ListingType } from '../../global.types'




interface Props {
  listing: ListingType & {
    creator: {
      name: string,
      _id: string,
      image: string
    }
  }
}






const ListingInfo = ({ listing }: Props) => {
  return (
    <div className=" flex flex-col h-[200vh] gap-2 w-full">
      <div className="flex flex-col gap-2">
        <div className=' font-semibold text-2xl'>
          <p>{listing.title} </p>
          <p> Rs.{listing.price} <span className=' text-neutral-500 font-normal text-sm'>per night</span> </p>
        </div>
        <div className="flex flex-row items-center gap-2 ">
          <div>Hosted by <span className=' text-xl font-semibold '>{listing.creator.name} </span></div>
        </div>
        <div className=" flex flex-row items-center gap-4 text-neutral-500  ">
          <p className=' flex flex-col items-center'>
            <Users /> {listing.guestCount}
          </p>
          <p className=' flex flex-col items-center'>
            <Home /> {listing.roomCount}
          </p>
          <p className=' flex flex-col items-center'>
            <ShowerHead />{listing.bathroomCount}
          </p>
        </div>
      </div>
      <hr />
      <div className=' flex items-center gap-1'>
        <Home />  {listing.category}
      </div>
      <hr />
      <div className=" text-justify text-sm font-normal text-neutral-700">
        {listing.description}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem impedit necessitatibus esse, quasi eveniet at libero vero optio vitae eius temporibus aliquam placeat perferendis sed eum corporis distinctio molestias ex, dolorem a rerum dolorum ut! Ea molestiae distinctio eaque iste praesentium voluptas aperiam maiores! Rem numquam deserunt autem architecto recusandae.
      </div>
      <hr />
    </div>
  )
}

export default ListingInfo