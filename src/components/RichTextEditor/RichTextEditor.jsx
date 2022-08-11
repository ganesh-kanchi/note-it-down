import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "link",
  "image",
];

export const RichTextEditor = ({ value, setValue }) => {
  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      value={value}
      onChange={setValue}
      placeholder="Take a note..."
    />
  );
};