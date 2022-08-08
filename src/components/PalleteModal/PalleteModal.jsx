import { useNotes } from "contexts/notesContext";

const colorData = [
  {
    id: 1,
    color: "#f3f3f3",
  },
  {
    id: 2,
    color: "#ccedfa",
  },
  {
    id: 3,
    color: "#bafbba",
  },
  {
    id: 4,
    color: "#ffffbe",
  },
  {
    id: 5,
    color: "#fed4da",
  },
];

export const PalleteModal = ({ note, setFormInput }) => {
  const { beingEdited, updateNoteHandler, formInput } = useNotes()

  return (
    <div className="absolute bottom-[-3.5rem] left-[-0.5rem] bg-white rounded flex flex-wrap items-center justify-center m-2 pt-1 pr-2 pb-1 pl-2 z-[2] ">
      {colorData.map((color) => (
        <button
          key={color.id}
          type="button"
          className=" m-1 w-6 h-6 rounded-full border border-solid border-slate-800 p-0 text-[1rem]"
          style={{ backgroundColor: color.color }}
          onClick={(e) => {
            e.stopPropagation();
            beingEdited
              ? setFormInput({ ...formInput, bgColor: color.color })
              : updateNoteHandler({ ...note, bgColor: color.color });
          }}
        ></button>
      ))}
    </div>
  );
};