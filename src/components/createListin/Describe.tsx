"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../ui/input'
import { DESCRIPTION, TITLE } from '@/redux/constant'
import { Textarea } from '../ui/textarea'

const Describe = ({ className }: { className: string }) => {

    const dispatch = useDispatch()
    const { title, description } = useSelector((state: any) => state.listingReducer)



    return (
        <div className={className}>
            <p className=' my-5'>How do you describe your place</p>
            <Input value={title} onChange={(e) => dispatch({ type: TITLE, payload: e.target.value })} placeholder='Title' className=' bg-white text-black border-2 my-5' />
            <Textarea value={description} onChange={(e) => dispatch({ type: DESCRIPTION, payload: e.target.value })} placeholder='Description' className=' bg-white text-black border-2 my-5 h-48 outline-none resize-none' />
        </div>
    )
}

export default Describe