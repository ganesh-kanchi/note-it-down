import { ColorLensOutlinedIcon, BarChartIcon } from "assets";
import { PalleteModal, PriorityModal, RichTextEditor } from "components";
import { useNotes } from "contexts/notesContext";
import { useState } from "react";

export const NoteInputModal = () => {
  const { formInput, setFormInput, noteExists, archiveExists, submitForm, closeNoteModal } = useNotes();
  const [showPalleteModal, setShowPalleteModal] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);

  const buttonDisabled = !formInput.noteTitle && formInput.content === "<p><br></p>";

  return (
    <div className="flex justify-center items-center w-full h-full fixed top-0 left-0 bg-black/50 z-[3]">
      <form
        className="flex flex-col  w-[25rem] m-4 rounded-md relative border-primary border-2"
        onSubmit={submitForm}
        style={{ backgroundColor: formInput.bgColor }}
      >
        <div>
          <input
            className="p-2 w-full bg-inherit text-base focus:outline-none"
            type="text"
            placeholder="Title"
            value={formInput.noteTitle}
            onChange={(e) => setFormInput({ ...formInput, noteTitle: e.target.value })}
            autoFocus
          />
        </div>

        <div className=" input input-primary">
          <RichTextEditor
            value={formInput.content}
            setValue={(e) => setFormInput({ ...formInput, content: e })}
          />
        </div>

        <div className=" input input-primary">
          <input
            className="p-2 text-base w-full bg-inherit border-none focus:outline-none"
            type="text"
            placeholder="Add a label"
            value={formInput.labels}
            onChange={(e) => setFormInput({ ...formInput, labels: [e.target.value] })}
          />
        </div>

        <div className="flex justify-between">
          <div className="flex items-center">
            <i
              className="text-slate-400 mr-1.5 ml-1.5 pt-0.5 pr-1 pb-0.5 pl-1 rounded-full hover:bg-slate-200"
              role="button"
              onClick={() => setShowPalleteModal((show) => !show)}
            >
              <ColorLensOutlinedIcon />
            </i>
            <i
              className="text-slate-400 mr-1.5 ml-1.5 pt-0.5 pr-1 pb-0.5 pl-1 rounded-full hover:bg-slate-200"
              role="button"
              onClick={() => setShowPriorityModal((show) => !show)}
            >
              <BarChartIcon />
            </i>
          </div>

          <div className="flex justify-between items-center">
            <button type="button" className="m-2 cursor-pointer" onClick={closeNoteModal}>
              Cancel
            </button>
            <button
              type="submit"
              className={`m-2 bg-primary p-2 pt-1 pb-1 rounded-md cursor-pointer ${
                buttonDisabled ? "bg-slate-200 text-slate-300" : null
              }`}
              style={{
                cursor: buttonDisabled ? "not-allowed" : "pointer",
              }}
              disabled={buttonDisabled}
            >
              {noteExists || archiveExists ? "Save" : "Add"}
            </button>
          </div>
          {showPalleteModal ? <PalleteModal setFormInput={setFormInput} /> : null}
          {showPriorityModal ? <PriorityModal /> : null}
        </div>
      </form>
    </div>
  );
};