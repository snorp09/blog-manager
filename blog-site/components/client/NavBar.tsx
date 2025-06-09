"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { NotebookPen } from "lucide-react";
import { SendHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import PostModal from "./PostModal";



export default function NavBar() {
  const [text, setText] = useState<String>(null!);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  function handleModalClose(text: String) {
    setText(text);
    setModalOpen(false);
  }

  useEffect(() => {
    if (!text) {
      return;
    }
    console.log(`Current text is: ${text}`)
  }, [text])

  return (
    <div>
      <PostModal open={modalOpen} closeHandler={handleModalClose}/>
      <div className="flex bg-base-200 py-2 px-4 items-center justify-between">
        <h1 className="text-2xl font-bold select-none">Blog Site</h1>
        <div className="flex space-x-4">
          <button
            className="btn btn-primary"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <NotebookPen />
            New Post
          </button>
        </div>
      </div>
    </div>
  );
}
