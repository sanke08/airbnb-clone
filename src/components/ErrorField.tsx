import React from 'react'
import { twMerge } from 'tailwind-merge'


interface Props {
    error: string
    className?: string
}


const ErrorField = ({ className, error }: Props) => {
    return (
        <div className={twMerge(' w-full text-right text-rose-500 text-sm h-[0px] overflow-hidden', className, error && "h-[20px]")}>
            {error}
        </div>
    )
}

export default ErrorField