"use client"
import React from 'react'
import Togglebutton from '../Togglebutton'
import { useDispatch, useSelector } from 'react-redux'
import { FAMINITIES } from '@/redux/constant'

const Amenities = () => {
  const { amenities } = useSelector((state: any) => state.filterReducer)
  const dispatch = useDispatch()

  const handleChange = ({ action }: any) => {
    dispatch({ type: FAMINITIES, payload: { ...action } })
  }

  return (
    <div className=' mt-4'>
      <p className=' font-semibold text-2xl'>Amenities</p>
      <div className=' grid grid-cols-2 sm:grid-cols-4 gap-3 w-full'>
        <div className=' flex gap-x-1 items-center'>
          <p className=' w-full sm:w-fit'>Wifi</p>
          <Togglebutton value={amenities.wifi} onChange={() => handleChange({ action: amenities.wifi ? amenities.wifi = false : amenities.wifi = true })} />
        </div>
        <div className=' flex gap-x-1 items-center'>
          <p className=' w-full sm:w-fit'>AC</p>
          <Togglebutton value={amenities.ac} onChange={() => handleChange({ action: amenities.ac ? amenities.ac = false : amenities.ac = true })} />
        </div>
        <div className=' flex gap-x-1 items-center'>
          <p className=' w-full sm:w-fit'>Kitchen</p>
          <Togglebutton value={amenities.kitchen} onChange={() => handleChange({ action: amenities.kitchen ? amenities.kitchen = false : amenities.kitchen = true })} />
        </div>
        <div className=' flex gap-x-1 items-center'>
          <p className=' w-full sm:w-fit'>TV</p>
          <Togglebutton value={amenities.tv} onChange={() => handleChange({ action: amenities.tv ? amenities.tv = false : amenities.tv = true })} />
        </div>
      </div>
    </div>
  )
}

export default Amenities