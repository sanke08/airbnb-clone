"use client"
import React, { memo } from 'react'
import Modal from './Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import PlaceType from '../filter/PlaceType'
import PriceRange from '../filter/PriceRange'
import Itentials from '../filter/Itentials'
import Amenities from '../filter/Amenities'
import ShowButton from '../filter/ShowButton'


const FilterModal = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    return (
        <Modal className=' w-[40rem] py-6' open={searchParams.has("filtermodal")} close={() => router.back()}>
            <p className=' absolute mx-auto top-3 w-full -z-10 left-0 text-center'>Filter</p>
            <hr />
            <PlaceType />
            <PriceRange />
            <Itentials />
            <Amenities />
            <ShowButton />
        </Modal>
    )
}

export default memo(FilterModal)