import { Dot, Home, ShowerHead, Users } from 'lucide-react'
import React from 'react'
import { ListingType } from '../../global.types'
import Seperator from './Seperator'
import UserAvatar from './UserAvatar'




interface Props {
  listing: ListingType & {
    creator: {
      name: string,
      _id: string,
      image: string[]
    }
  }
}






const ListingInfo = ({ listing }: Props) => {
  return (
    <div className=" flex flex-col min-h-screen gap-4 w-full">
      <div className="flex flex-col gap-2">
        <div className=' font-semibold text-3xl'>
          {listing.title}
        </div>
        <div className=" flex flex-row items-center gap-2 text-neutral-500  ">
          <div className=' flex items-center'>
            <Dot className=' h-5 w-5' />
            {listing.guestCount} Guests
          </div>
          <div className=' flex items-center'>
            <Dot className=' h-5 w-5' /> {listing.roomCount} Rooms
          </div>
          <div className=' flex items-center'>
            <Dot className=' h-5 w-5' /> {listing.bathroomCount} Bathrooms
          </div>
        </div>
      </div>
      <Seperator />
      <div className=' flex gap-2 items-center'>
        <UserAvatar className=' h-14 w-14' src='https://images.unsplash.com/photo-1609010697446-11f2155278f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
        <div>
          <p className=' font-medium'>{listing.creator.name} </p>
          <p className=' text-sm'>Host Since 1 year</p>
        </div>
      </div>
      <Seperator />
      <div className=" text-justify text-lg font-normal text-neutral-700">
        {listing.description}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem impedit necessitatibus esse, quasi eveniet at libero vero optio vitae eius temporibus aliquam placeat perferendis sed eum corporis distinctio molestias ex, dolorem a rerum dolorum ut! Ea molestiae distinctio eaque iste praesentium voluptas aperiam maiores! Rem numquam deserunt autem architecto recusandae.
      </div>
      <Seperator />
    </div>
  )
}

export default ListingInfo