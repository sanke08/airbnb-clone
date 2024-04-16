import { useRouter } from 'next/navigation'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from './ui/button'
import { categories } from './Categories'

const CreateListingLayout = ({ children }) => {
    const router = useRouter()
    return (
        <div className='h-full'>
            <div className='flex w-full'>
                <div className={twMerge(' w-full overflow-scroll flex items-center hidescrollbar gap-x-3 mt-1')}>
                    {/* <Button onClick={() => router.push("/")} className={twMerge(' flex flex-col items-center h-max min-w-24 text-neutral-400',)}>  New</Button> */}
                    {/* {
                        categories.map((category) => (
                            <Button variant={"outline"} key={category.label} className={twMerge(' flex flex-col items-center border-none h-max relative w-24 text-neutral-500',)}>
                                <category.icon size={25} />
                                {category.label}
                            </Button>
                        ))
                    } */}
                {children}
                </div>
            </div>
        </div>
    )
}

export default CreateListingLayout