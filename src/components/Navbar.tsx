import { Loader, Search } from 'lucide-react'
import React, { Suspense } from 'react'
import UserButton from './UserButton'
import Link from 'next/link'
import Categories from './Categories'
import { getUser } from '@/action/getUser'
import { CategorySkeleton } from './CategorySkeleton'

const Navbar = async () => {
    const user = await getUser()
    return (
        <div className=' sticky bg-white w-full top-0 z-50 right-0 left-0'>
            <div className='  w-full border-b py-3 flex justify-between items-center'>
                <p className=' text-primary w-max text-3xl'>
                    <Link href={"/"}>
                        Otel
                    </Link>
                </p>
                <Link href={"/search"} className=' text-black md:flex shadow items-center gap-x-5 border px-10 p-2 rounded-full hidden hover:shadow-lg transition-all duration-300'>
                    <p>Anywhere</p>
                    <p>Any Week</p>
                    <div className=' flex items-center gap-x-2 text-neutral-500'>
                        Add Guest
                        <div className=' bg-primary w-max rounded-full text-white p-1'>
                            <Search className=' w-5 h-5 font-bold' />
                        </div>
                    </div>
                </Link>
                <Suspense fallback={<Loader className=' animate-spin w-10 h-10' />} >
                    <UserButton user={user} />
                </Suspense>
            </div>
            <Suspense fallback={<CategorySkeleton />} >
                <Categories />
            </Suspense>
        </div>
    )
}

export default Navbar




