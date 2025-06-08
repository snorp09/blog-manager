"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { NotebookPen } from "lucide-react";
import { SendHorizontal } from "lucide-react";
import React, {useEffect, useState} from "react";



export default function NavBar() {
  const [text, setText] = useState<string>("");
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
  
  useEffect(() => {
    if(text.length > 0) {
      console.log("Text set as value:", text);
    }
  }, [text])

  return (
    <>
      <div className="flex bg-base-200 py-2 px-4 items-center justify-between">
        <dialog className="modal" id="post-modal" onAnimationEnd={e => console.log("Animation Ended.")} onClose={() => {editor?.commands.setContent("<p>Write your post here...</p>")}}>
          <div className="modal-box">
            <EditorContent editor={editor} />
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => {
                  const dialog = document.getElementById("post-modal") as HTMLDialogElement;
                  if (dialog) {
                    dialog.close();
                  }
                  setText(editor?.getText() || "");
                }}
                ><SendHorizontal /> Post</button>
            </div>
          </div>
        </dialog>
        <h1 className="text-2xl font-bold select-none">Blog Site</h1>
        <div className="flex space-x-4">
          <button
            className="btn btn-primary"
            onClick={() => {
              (
                document.getElementById("post-modal") as HTMLDialogElement
              ).showModal();
            }}
          >
            <NotebookPen />
            New Post
          </button>
        </div>
      </div>
    </>
  );
}
