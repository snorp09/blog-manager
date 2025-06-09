"use client";
import { useState, useEffect, useRef } from "react";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { SendHorizontal } from "lucide-react";

interface PostModalProps {
    open: boolean
    closeHandler: (text: String) => void;
}

export default function PostModal(props: PostModalProps) {
    const {open, closeHandler} = props;
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Write your post here...</p>",
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose border rounded bg-base-100",
            }
        }
    });

    const dialogRef = useRef<HTMLDialogElement>(null)

    function dialogClose(){
        dialogRef.current?.close();
        closeHandler(editor?.getText() || "");
        editor?.commands.setContent("<p>Write your post here...</p>")
    }

    return (
        <dialog open={open} className="modal" onAnimationEnd={e => console.log("Animation Ended.")} onClose={_ => dialogClose()} ref={dialogRef}>
          <div className="modal-box">
            <EditorContent editor={editor} />
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={_ => dialogClose()}
                ><SendHorizontal /> Post</button>
            </div>
          </div>
        </dialog>
    )
}