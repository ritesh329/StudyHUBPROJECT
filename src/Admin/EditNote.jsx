import React, { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

import TipTapEditor from "./TipTapEditor"; // import your UI component

export default function NotesPage() {
  const [savedContent, setSavedContent] = useState("");

  // Initialize the editor
  const editor = useEditor({
    extensions: [StarterKit, Image, TextAlign.configure({ types: ["paragraph", "heading"] })],
    content: "<p>Hello World!</p>",
  });

  const handleUpdate = () => {
    if (editor) {
      const html = editor.getHTML();
      setSavedContent(html);
      alert("Content saved!");
      console.log("Saved content:", html);
    }
  };

  return (
    <div className=" p-6 bg-gray-900 min-h text-white">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>

      {/* Editor */}
      <TipTapEditor editor={editor} />

      {/* Save Button */}
      <button
        onClick={handleUpdate}
        className="mt-4 bg-green-600 hover:bg-green-500 px-3 py-1 rounded"
      >
        Update
      </button>

      {/* Optional preview */}
      {savedContent && (
        <div className="mt-4 p-2 bg-gray-800 rounded text-gray-200">
          <h3 className="font-semibold mb-2">Saved Content Preview:</h3>
          <div dangerouslySetInnerHTML={{ __html: savedContent }} />
        </div>
      )}
    </div>
  );
}
