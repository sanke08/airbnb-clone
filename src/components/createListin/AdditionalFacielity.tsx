import { twMerge } from "tailwind-merge"

const AdditionalFacielity = ({ className }: { className: string }) => {
    return (
        <div className={twMerge("", className)}>AdditionalFacielity</div>
    )
}

export default AdditionalFacielity