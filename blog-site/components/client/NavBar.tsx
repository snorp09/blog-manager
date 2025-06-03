"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { NotebookPen } from "lucide-react";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Gemma.</p>",
  });
  return <EditorContent editor={editor} />;
};

export default function NavBar() {
  return (
    <>
      <div className="flex bg-base-200 py-2 px-4 items-center justify-between">
        <dialog className="modal" id="post-modal">
          <div className="modal-box">
            <button className="btn btn-primary">Gemma.</button>
            <Editor />
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
