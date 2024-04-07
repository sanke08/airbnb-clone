"use client";

import { UploadButton, UploadDropzone } from "@/lib/uploadthings";

// import { UploadButton } from "@/utils/uploadthings";

interface Props {
    onchange: any
    endpoint: any
}

export default function FileUploader({ onchange, endpoint }: Props) {
    return (
        <div className=" w-full flex justify-center items-center">
            <UploadButton
                endpoint={endpoint} 
                onClientUploadComplete={(res: any) => {onchange(res?.[0].url);console.log(res)}} 
                onUploadError={(error: any) => { console.log(error) }}
            />
        </div>
    );
}