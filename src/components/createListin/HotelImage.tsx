"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import FileUploader from '../FileUploader'
import { X } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { IMAGES } from '@/redux/constant'

const HotelImage = ({ className }: { className: string }) => {

  const dispatch = useDispatch()
  const [urls, setUrls] = useState<string[]>([])
  const handleChangeUrl = (url: string) => {
    setUrls((pre) => [...pre, url])
  }

  const handleRemove = (url: string) => {
    const filter = urls.filter(item => item !== url)
    setUrls(filter)
  }

  useEffect(() => {
    dispatch({ type: IMAGES, payload: urls })
  }, [dispatch, urls])



  return (
    <div className={twMerge(className, "h-fit md:p-5 pt-4")} >
      <div className='grid grid-cols-2 md:grid-cols-4 gap-2 items-end justify-center'>

        {
          urls.map((url) => (
            <div key={url} className=' w-28 h-28 relative '>
              <Image src={url} alt='' fill className=' rounded-lg' />
              <p onClick={() => handleRemove(url)} className=' absolute -top-1 -right-1 bg-rose-500 text-white rounded-full'><X className=' h-5 w-5' /> </p>
            </div>
          ))
        }
      </div>
      {
        urls.length < 5 &&
        <div className=' w-max mx-auto mt-3'>
          <FileUploader endpoint={"imageUploader"} onchange={(value: any) => handleChangeUrl(value)} />
        </div>
      }
    </div>
  )
}

export default HotelImage