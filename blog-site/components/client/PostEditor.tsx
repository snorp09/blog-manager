"use client";
import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface PostEditorProps {
    onTextUpdate: (text: String) => void;
}

export default function PostEditor(props: PostEditorProps) {
    const {onTextUpdate} = props;
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Write your post here...</p>",
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose border rounded bg-base-100",
            }
        },
        onUpdate: (e) => onTextUpdate(e.editor.getText()),
    });

    return(
        <div>
            <EditorContent editor={editor} />
        </div>
    )
}