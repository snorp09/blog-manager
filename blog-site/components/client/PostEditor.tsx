"use client";
import React, { ButtonHTMLAttributes, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ArrowDown, Bold, BookType, ChevronDown, Italic, Send, SendHorizonal } from "lucide-react";

interface PostEditorProps {
    onTextUpdate: (text: String) => void;
    onPost: (htmlContent: String) => void;
    displaying?: boolean
}

function HeaderButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    let classNames = props.className ? props.className : "";
    classNames = classNames + " bg-base-200 border rounded p-1.5 hover:bg-base-100 cursor-pointer"
    return <button {...props} className={classNames} />
}

export default function PostEditor(props: PostEditorProps) {
    const { onTextUpdate } = props;
    const [titleText, setTitleText] = useState("");
    const editor = useEditor({
        extensions: [
            StarterKit.configure(
                {
                    heading: {
                        levels: [1, 2]
                    }
                }
            )
        ],
        content: "<p>Write your post here...</p>",
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose max-w-none bg-base-300 border p-2 rounded h-96",
            }
        },
        onUpdate: (e) => onTextUpdate(e.editor.getText()),
    });

    useEffect(() => {
        if(!editor) return;
        if(!props.displaying){
            setTitleText("");
            editor.commands.setContent("<p>Write your post here...</p>");
        }
    }, [props.displaying])

    return (
        <div className="bg-base-200 p-2 rounded flex flex-col gap-4 justify-center">
            <h1 className="text-2xl">Create new post.</h1>
            <input className="input w-full" placeholder="Title..." value={titleText} onChange={e => setTitleText(e.target.value)}/>
            <div>
                <div className="flex gap-2 mb-2">
                    <HeaderButton onClick={_ => editor?.commands.toggleBold()}><Bold size={24} /></HeaderButton>
                    <HeaderButton onClick={_ => editor?.commands.toggleItalic()}><Italic size={24} /></HeaderButton>
                    <div className="dropdown">
                        <HeaderButton className="flex gap-1 items-center"><BookType size={24} />Title<ChevronDown strokeWidth={1} /></HeaderButton>
                        <ul className="dropdown-content menu bg-base-100">
                            <li><button className="bg-none border-none" onClick={_ => editor?.commands.setHeading({level: 1})}>Header 1</button></li>
                            <li><button className="bg-none border-none" onClick={_ => editor?.commands.setHeading({level: 2})}>Header 2</button></li>
                            <li><button className="bg-none border-none" onClick={_ => editor?.commands.setHeading({level: 3})}>Normal</button></li>
                        </ul>
                    </div>
                </div>
                <EditorContent editor={editor} />
            </div>
            <div className="self-end">
                <button className="btn btn-primary" onClick={_ => props.onPost(editor?.getHTML() ? editor.getHTML() : "")}>Post<SendHorizonal /></button>
            </div>
        </div>
    )
}