import { useNotes } from "contexts/notesContext";
import { NoteInputModal, NoteCardsList } from "components";
import { useEffect } from "react";

export const LabelsPage = () => {
  const {
    showInputModal,
    noteState: { notes },
    labelsArray,
    setLabelsArray,
  } = useNotes();

  useEffect(() => {
    setLabelsArray(() => {
      const labels = notes.map((note) => note.labels[0] || null);

      return notes
        .map((note) => note.labels[0])
        .filter((label, index) => labels.indexOf(label) === index);
    });
  }, [notes, setLabelsArray]);

  return (
    <div className="flex flex-col items-center p-4 w-full">

      {labelsArray.length > 0 ? (
        labelsArray?.map((tag, index) => {
          return (
            <div className="max-w-[25rem] m-auto mt-0 mb-0" key={`${tag}${index+1}`}>
              <div className="text-xl font-medium">{tag.toUpperCase()}</div>
              <NoteCardsList notes={notes.filter((note) => note.labels[0] === tag)} />
            </div>
          );
        })
      ) : (
        <p className="text-center">No labels are added!</p>
      )}
      {showInputModal ? <NoteInputModal /> : null}

    </div>
  );
};