"use client";
import PostEditor from "@/components/client/PostEditor";

export default function Post(){
    return(
        <div className="flex flex-col flex-grow items-center justify-center w-full">
            <div className="w-1/2">
                <PostEditor onTextUpdate={(text) => console.log(text)} />
            </div>
        </div>
    )
}