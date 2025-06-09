"use client";
import { useState, useEffect, useRef } from "react";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { SendHorizontal, X } from "lucide-react";
import PostEditor from "./PostEditor";
import { PostOutGoing, sendPost } from "@/lib/Post";

interface PostModalProps {
    open: boolean
    closeHandler: () => void;
}

export default function PostModal(props: PostModalProps) {
    const {open, closeHandler} = props;
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Write your post here...</p>",
        immediatelyRender: false,
    });

    const dialogRef = useRef<HTMLDialogElement>(null)

    function dialogClose(){
        dialogRef.current?.close();
        closeHandler();
    }

    function handlePost(post: PostOutGoing){
        sendPost(post);
        dialogClose();
    }

    return (
        <dialog open={open} className="modal" onAnimationEnd={e => console.log("Animation Ended.")} onClose={_ => dialogClose()} ref={dialogRef}>
          <div className="modal-box w-11/12 max-w-5xl">
            <div className="flex justify-end items-center mb-2">
                <button className="btn btn-error p-1 h-fit" onClick={dialogClose}><X size={24}/></button>
            </div>
            <PostEditor onPost={handlePost} displaying={open} />
          </div>
        </dialog>
    )
}