// RichTextEditor.tsx

import dynamic from "next/dynamic";
import { ChangeEvent } from "react";
import "react-quill/dist/quill.snow.css";

// Use dynamic import to load ReactQuill only on the client side
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (event: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, true] }],
          ["bold", "italic", "underline", "strike", "link"],
          [{ color: [] }, { background: [] }],
          //   ["image", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      }}
      style={{ height: "300px" }}
      className="max-h-[300px] h-full w-full"
    />
  );
};

export default RichTextEditor;
