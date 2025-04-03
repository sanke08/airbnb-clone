
export const CategorySkeleton = () => {
    return (
        <div className=' w-full overflow-scroll flex items-center hidescrollbar gap-x-5 px-2'>
            <div className=' flex flex-col items-center h-max min-w-24 text-neutral-400' />
            {
                [...Array(10)].map((i) => (
                    <div key={i} className=' flex flex-col items-center h-max min-w-24 border rounded-md space-y-1 text-neutral-500 p-1 animate-pulse'>
                        <p className=' w-14 animate-pulse bg-neutral-400 h-10 rounded-md' />
                        <p className=' w-20 animate-pulse bg-neutral-400 py-2 rounded-md' />

                    </div>
                ))
            }
        </div>
    )
}