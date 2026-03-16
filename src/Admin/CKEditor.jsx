import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

export default function EditorComponent({ content, setContent }) {

  const uploadAdapter = (loader) => {
    return {
      upload: async () => {

        const file = await loader.file;

        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
          "https://studyhubapi-e2lb.onrender.com/api/upload/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        return {
          default: res.data.url
        };

      }
    };
  };

  return (

    <div className="border rounded bg-gray-100">

      <CKEditor
        editor={ClassicEditor}

        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "insertTable",
            "imageUpload",
            "blockQuote",
            "undo",
            "redo"
          ]
        }}

        data={content || "<p>Write your notes...</p>"}

        onReady={(editor) => {

          editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
          };

        }}

        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}

      />

    </div>

  );
}