export const BoxSkeleton = () => {
    return (
        <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-3 my-3'>
            {
                [...Array(10)].map((i, j) => (
                    <div key={j} className=' w-full border-2 rounded-lg p-2'>
                        <div className=' bg-neutral-700/50 w-full aspect-square rounded-lg animate-pulse' />
                        <div className=' flex justify-between items-center pt-2 px-2'>
                            <p className=' w-28 py-3 bg-neutral-700/50 animate-pulse rounded-lg' />
                            <p className=' text-xs py-2 bg-neutral-700/50 w-14 animate-pulse rounded-md' />
                        </div>
                        <p className=' p-2 w-20 bg-neutral-700/50 m-2 rounded-lg' />
                    </div>
                ))
            }
        </div>
    )
}

