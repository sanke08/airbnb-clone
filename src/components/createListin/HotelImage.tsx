"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import FileUploader from '../FileUploader'
import { X } from 'lucide-react'

const HotelImage = ({ className }: { className: string }) => {

  const [urls, setUrls] = useState([
    
    "https://utfs.io/f/7cd00b98-563d-4efb-a40a-74cdabef5c21-59mbqw.jpg",
    "https://images.unsplash.com/photo-1642425149556-b6f90e946859?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    

])
  const handleChangeUrl = (url: string) => {
    setUrls((pre) => [...pre, url])
  }
  // https://utfs.io/f/7cd00b98-563d-4efb-a40a-74cdabef5c21-59mbqw.jpg

  const handleRemove = (url: string) => {
    const filter = urls.filter(item => item !== url)
    setUrls(filter)
  }




  return (
    <div className={twMerge(className, "grid grid-cols-4 gap-2 justify-center flex-wrap p-5")} >
      {
        urls.map((url) => (
          <div key={url} className=' w-28 h-28 relative rounded-lg'>
            <Image src={url} alt='' fill />
            <p onClick={()=>handleRemove(url)} className=' absolute -top-1 -right-1 bg-rose-500 text-white rounded-full'><X className=' h-5 w-5' /> </p>
          </div>
        ))
      }
      {
        urls.length < 5 &&
        <FileUploader endpoint={"imageUploader"} onchange={(value: any) => handleChangeUrl(value)} />
      }
    </div>
  )
}

export default HotelImage