import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const UserAvatar = ({ src, className }: { src: string, className?: string }) => {
  return (
    <div className={twMerge(' w-9 h-9 rounded-full relative overflow-hidden',className)}>
      <Image src={src} alt='' fill className=' w-full h-full absolute rounded-full' />
    </div>
  )
}

export default UserAvatar