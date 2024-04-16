"use client"
import { Home } from 'lucide-react'
import React, { useCallback } from 'react'
import { Button } from './ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import qs from "query-string"



const Categories = () => {

    const searchParams = useSearchParams()
    const router = useRouter()

    const pathname = usePathname()

    const handleCat = useCallback((cat: string) => {
        const sq = qs.parse(searchParams.toString())
        sq.category = cat
        const url = qs.stringifyUrl({
            url: "/",
            query: sq
        })
        router.push(url)
    }, [router, searchParams])

    const handleFilter = useCallback(() => {
        const sq = qs.parse(searchParams.toString())
        sq.filtermodal = "true"
        const url = qs.stringifyUrl({
            url: "/",
            query: sq
        })
        router.push(url)
    }, [router, searchParams])

    return (
        <div className={twMerge(' flex gap-x-3 items-center', pathname !== "/" && "hidden")}>
            <div className={twMerge(' w-full overflow-scroll flex items-center hidescrollbar gap-x-2 mt-1')}>
                <Button onClick={() => router.push("/")} className={twMerge(' flex px-6 flex-col items-center h-max min-w-max text-neutral-400', !searchParams.has("category") && "bg-primary hover:bg-primary text-white hover:text-white")}> <Home /> New</Button>
                {
                    categories.map((category) => (
                        <Button onClick={() => handleCat(category.label)} variant={"outline"} key={category.label} className={twMerge(' flex flex-col items-center border-none h-max relative min-w-max px-6 text-neutral-500', searchParams?.get("category") === category.label && " bg-primary hover:bg-primary text-white hover:text-white",)}>
                            <category.icon size={25} />
                            {category.label}
                        </Button>
                    ))
                }
            </div>
            <Button onClick={handleFilter} className=' h-full text-black w-max border-2 border-neutral-300'>Filter</Button>
        </div>
    )
}

export default Categories

export const categories = [

    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!',
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property is has windmills!',
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern!'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the countryside!'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This is property has a beautiful pool!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is near a lake!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activies!'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is an ancient castle!'
    },
    {
        label: 'Caves',
        icon: GiCaveEntrance,
        description: 'This property is in a spooky cave!'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property offers camping activities!'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is in arctic environment!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert!'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in a barn!'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is brand new and luxurious!'
    }
]