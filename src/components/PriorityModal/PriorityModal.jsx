import { useNotes } from "contexts/notesContext";

export const PriorityModal = ({ note }) => {
  const { formInput, setFormInput, updateNoteHandler, beingEdited } = useNotes();

  const handlePriority = (priority) => {
    beingEdited
      ? setFormInput({ ...formInput, priority: priority })
      : updateNoteHandler({ ...note, priority: priority });
  };

  return (
    <div
      className="flex absolute m-2 p-1 pr-2 pl-2 bottom-[-3.5rem] gap-1 left-[-0.5rem] z-[2] bg-white rounded"
      onClick={(e) => e.stopPropagation()}
    >
      <label className="p-1" >
        <input
          type="radio"
          name="priority"
          value="1"
          checked={
            note ? note.priority.Low === "1" : formInput.priority.Low === "1"
          }
          onChange={(e) => handlePriority({ Low: e.target.value })}
        />{" "}
        Low
      </label>
      <label className="p-1" >
        <input
          type="radio"
          name="priority"
          value="2"
          checked={
            note ? note.priority.Medium === "2" : formInput.priority.Medium === "2"
          }
          onChange={(e) => handlePriority({ Medium: e.target.value })}
        />{" "}
        Medium
      </label>
      <label className="p-1" >
        <input
          type="radio"
          name="priority"
          value="3"
          checked={
            note ? note.priority.High === "3" : formInput.priority.High === "3"
          }
          onChange={(e) => handlePriority({ High: e.target.value })}
        />{" "}
        High
      </label>
    </div>
  );
};