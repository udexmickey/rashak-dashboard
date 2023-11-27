import React, { useMemo, useCallback, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const RichTextEditor = ({ value, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [content, setContent] = useState(value || []);

  const handleEditorChange = useCallback(
    (newContent) => {
      setContent(newContent);
      onChange(newContent);
    },
    [onChange]
  );

  return (
    <Slate editor={editor} value={content} onChange={handleEditorChange}>
      <Editable />
    </Slate>
  );
};

export default RichTextEditor;
