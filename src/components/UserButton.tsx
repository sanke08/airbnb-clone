"use client"
import React, { Suspense, useCallback, useState } from 'react'
import { Menu, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { CREATE_LISTING, OPEN_ADD_LISTING, OPEN_AUTH } from '@/redux/constant'
import { UserType } from '../../global.types'
import { signOut } from 'next-auth/react'
import UserAvatar from './UserAvatar'


const UserButton = ({ user }: { user: UserType | null }) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(false)
    const [hide, sethide] = useState(true)

    const handleToggle = useCallback(() => {
        if (toggle) {
            setTimeout(() => {
                sethide(true)
            }, 100);
            setToggle(false)
        } else {
            setTimeout(() => {
                setToggle(true)
            }, 0);
            sethide(false)
        }
    }, [toggle])


    return (
        <div className=" w-max">
            {
                !user ?
                    <Button onClick={() => dispatch({ type: OPEN_AUTH })} variant={"none"} className=' border-2 '>Sign in</Button>
                    :
                    <div className=' flex items-center gap-x-2 w-max'>
                        <Button onClick={() => { dispatch({ type: CREATE_LISTING }); dispatch({ type: OPEN_ADD_LISTING }) }} variant={"none"} className=' border border-neutral-300 rounded-full shadow transition-all duration-300 hover:shadow-lg'>Airbnb your home</Button>
                        <div className=' relative w-max'>
                            <Button onClick={handleToggle} className=' border-rose-400/40 border rounded-full px-2'>
                                <Menu className=' h-5 w-5  text-black' />
                                <Suspense fallback={<p className=' w-3 h-3 bg-neutral-500 animate-pulse' />} >
                                    <UserAvatar src={user.image} />
                                </Suspense>
                            </Button>
                            <div className={twMerge(' w-max right-0 h-max z-50 absolute flex flex-col gap-1 bg-white border rounded-lg top-full shadow-md shadow-black/30 p-2 transition-all', toggle ? " scale-100" : " scale-[0.6] -translate-y-10", hide && "hidden")} >
                                <Item label="My favorites" onClick={() => { router.push(`/favourites`); handleToggle() }} />
                                <Item label="My reservations" onClick={() => { router.push(`/reservations`); handleToggle() }} />
                                <Item label="My properties" onClick={() => { router.push(`/properties`); handleToggle() }} />
                                <Item label="Airbnb your home" onClick={() => { router.push(``); handleToggle() }} />
                                <Item label="Logout" onClick={() => signOut()} className=' bg-rose-100 text-rose-700' />
                            </div>
                        </div>

                    </div>
            }
        </div>
    )
}

export default UserButton


const Item = ({ onClick, label, className }: { onClick: () => void, label: string, className?: string }) => {
    return (
        <Button onClick={onClick} className={twMerge(" px-6 py-2 w-full cursor-pointer text-black justify-start rounded-lg transition font-semibold ", className)}>
            {label}
        </Button>
    )
}