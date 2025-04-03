"use client"
import React, { useRef, useState } from 'react'
import Modal from './Modal'
import SetCategory from '../createListin/SetCategory'
import { twMerge } from 'tailwind-merge'
import CountrySelect from '../createListin/CountrySelect'
import Rooms from '../createListin/Rooms'
import Describe from '../createListin/Describe'
import Price from '../createListin/Price'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAN_UP, CLOSE_ADD_LISTING } from '@/redux/constant'
import HotelImage from '../createListin/HotelImage'
import BottomButtons from '../createListin/BottomButtons'
import { Input } from '../ui/input'


const CreateListingModal = () => {

    const dispatch = useDispatch()
    const { openListin } = useSelector((state: any) => state.toggleReducer)
    const [step, setStep] = useState(1)
    const checkRef = useRef(false)


    const handleClose = () => {
        dispatch({ type: CLOSE_ADD_LISTING });
        if (!checkRef.current) {
            dispatch({ type: CLEAN_UP })
            setStep(1)
        }
    }

    return (
        <Modal close={handleClose} open={openListin} header='Create Listing' description='rent your hotel'>
            <div className={twMerge(' flex relative transition-all duration-500', step === 1 && "h-[28rem]", step === 2 && "h-[18rem]", step === 3 && "h-[20rem]", step === 4 && "h-[28rem]", step === 5 && "h-[10rem]", step === 6 && "h-[20em] max-h-[25em]")}>
                <SetCategory className={twMerge(' overflow-hidden w-full h-full transition-all duration-1000', step < 1 && `translate-x-[200%]`, step > 1 && "-translate-x-[200%]")} />
                <CountrySelect className={twMerge('absolute w-full h-full transition-all duration-1000', step < 2 && `translate-x-[200%]`, step > 2 && "-translate-x-[200%]")} />
                <Rooms className={twMerge('absolute overflow-hidden w-full h-full transition-all duration-1000', step < 3 && `translate-x-[200%]`, step > 3 && "-translate-x-[200%]")} />
                <Describe className={twMerge('absolute overflow-hidden w-full h-full transition-all duration-1000', step < 4 && `translate-x-[200%]`, step > 4 && "-translate-x-[200%]")} />
                <Price className={twMerge('absolute overflow-hidden w-full h-full transition-all duration-1000', step < 5 && `translate-x-[200%]`, step > 5 && "-translate-x-[200%]")} />
                <HotelImage className={twMerge('absolute overflow-hidden w-full h-full transition-all duration-1000', step < 6 && `translate-x-[200%]`, step > 6 && "-translate-x-[200%]")} />
            </div>
            <div className=' flex gap-1 items-center w-full justify-end px-5'>
                <label htmlFor='check' className=' cursor-pointer'>save as draft</label>
                <Input onChange={(e) => checkRef.current = e.target.checked} id="check" type="checkbox" className=' w-max cursor-pointer' />
            </div>
            <BottomButtons step={step} onChangeStep={(no: number) => setStep(no)} />
        </Modal>
    )
}

export default CreateListingModal