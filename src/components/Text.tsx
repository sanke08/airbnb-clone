"use client"
const Text = () => {
    return (
        <div className=" w-40 overflow-hidden">
            <div className="absolute w-full">
                <div className=" bg-red-500 w-full aspect-square"></div>
                <div className=" bg-yellow-500 w-full aspect-square"></div>
                <div className=" bg-blue-500 w-full aspect-square"></div>
                <div className=" bg-green-500 w-full aspect-square"></div>
            </div>
        </div>
    )
}

export default Text