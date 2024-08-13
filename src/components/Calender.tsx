"use client"
import React, { useCallback, useState } from 'react'
import { eachDayOfInterval, endOfMonth, startOfToday, format, isToday, isSameMonth, endOfWeek, parse, add, getDay, startOfWeek, isBefore, } from "date-fns"
import { twMerge } from 'tailwind-merge'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'



interface Prosp {
    onChange: (val: Date) => void
    selected: string
    className?: string
    title: string
    disabledDates: Array<any>
}



const Calender = ({ onChange, selected, className, title, disabledDates }: Prosp) => {

    const todate = startOfToday()
    const [currmonth, setCurrmon] = useState(format(todate, "MMM-yyyy"))
    const firstDatOfCurrentMonth = parse(currmonth, "MMM-yyyy", new Date())


    const newDays = eachDayOfInterval({
        start: startOfWeek(firstDatOfCurrentMonth),
        end: endOfWeek(endOfMonth(firstDatOfCurrentMonth))
    })




    const nextMon = useCallback(() => {
        const firstdayofNextMonth = add(firstDatOfCurrentMonth, { months: 1 })
        setCurrmon(format(firstdayofNextMonth, "MMM-yyyy"))
    }, [firstDatOfCurrentMonth])



    const preMon = useCallback(() => {
        const firstdayofNextMonth = add(firstDatOfCurrentMonth, { months: -1 })
        setCurrmon(format(firstdayofNextMonth, "MMM-yyyy"))
    }, [firstDatOfCurrentMonth])


    const handle = (date: Date) => {
        onChange(date)
    }




    return (
        <div className={className}>
            <p className=' font-semibold text-lg border-b pl-4'>{title} </p>
            <div className=' flex items-center gap-x-2'>
                <Button onClick={preMon} className=' text-black p-1 bg-neutral-200'>
                    <ChevronLeft className=' h-6 w-6' />
                </Button>
                {format(firstDatOfCurrentMonth, "MMMM-yyyy")}
                <Button onClick={nextMon} className=' text-black p-1 bg-neutral-200'>
                    <ChevronRight className=' h-6 w-6' />
                </Button>
            </div>
            <div className={twMerge(' w-max grid grid-cols-7 gap-3 p-2',)}>

                {
                    newDays.map((day, i) => {

                        const isDisabled = isBefore(day, add(Date.now(), { days: -1 }))
                        const isReserve = disabledDates.find((d) => format(d, "dd-MMM-yyyy").toString() === format(day, "dd-MMM-yyyy").toString())
                        return (
                            <Button
                                key={i}
                                onClick={() => handle(day)}
                                disabled={isDisabled || isReserve}
                                className={twMerge(
                                    ' w-10 h-10 rounded-full shadow-sm text-black relative p-2 border flex justify-center items-center text-center cursor-pointer hover:bg-neutral-600/15',
                                    isToday(day) && " text-rose-700 bg-rose-400/20",
                                    isSameMonth(day, firstDatOfCurrentMonth) ? "" : "text-neutral-400",
                                    i === 0 && startcol[getDay(day)],
                                    selected.toString() === format(day, "dd-MMM-yyy").toString() && "bg-rose-500 hover:bg-rose-500 text-white",

                                )}>
                                {format(day, "d")}
                                {isReserve &&
                                    <p className=' w-[60%] h-[1px] bg-black absolute -rotate-45' />
                                }
                            </Button>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Calender



const startcol = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
]