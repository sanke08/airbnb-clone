import Image from 'next/image'
import React from 'react'

const UserAvatar = ({src}:{src:string}) => {
  return (
    <div className=' w-9 h-9 rounded-full relative overflow-hidden'>
        <Image src={src} alt='' fill className=' w-full h-full absolute rounded-full' />
    </div>
  )
}

export default UserAvatar