import { useState } from "react";
import { ColorLensOutlinedIcon, ArchiveOutlinedIcon, DeleteOutlinedIcon, BarChartIcon, UnarchiveOutlinedIcon } from "assets/index";
import { useNotes } from "contexts/notesContext";
import { PalleteModal, PriorityModal } from "components";

export const NoteCard = ({ note }) => {
  const { _id, noteTitle, content, labels, createdTime, bgColor, priority } = note;
  const [showCardOptions, setShowCardOptions] = useState(false);
  const [showPalleteModal, setShowPalleteModal] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);

  const { setShowInputModal, setFormInput, setBeingEdited,noteState: {archives} , archiveNote, unArchiveNote } = useNotes();

  const inArchive = archives?.find((eachNote) => eachNote._id === note._id);

  const editNote = () => {
    setShowInputModal(true);
    setFormInput(note);
    setBeingEdited(true);
  };

  return (
    <div
      key={_id}
      className={`flex flex-col rounded max-w-full h-max mt-2 mr-0 z-1`}
      onMouseOver={() => setShowCardOptions((show) => !show)}
      onMouseOut={() => setShowCardOptions((show) => !show)}
      onClick={editNote}
      style={{ backgroundColor: bgColor }}
    >
      <div className="grid grid-cols-[9fr_1fr] relative">
        <div>
          <div className="break-all pt-3 pl-3 text-[1.1rem]">{noteTitle}</div>
          <div
            className="break-all pt-3 pl-3"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          {labels.length > 0 ? (
            <div className="w-max m-3 mb-0 pt-1 pr-1.5 pl-1.5 break-all bg-slate-300 rounded-2xl text-[0.7rem] uppercase">{labels[0]} </div>
          ) : null}
        </div>

        {priority ? (
          <div className="mt-3 mr-3 p-[0.1rem] text-[0.7rem] h-max text-slate-600 border border-black rounded  bg-red ">{Object.keys(priority)[0]}</div>
        ) : null}
      </div>

      <div
        className="flex items-center justify-between relative p-3 text-[0.8rem] "
        style={{ visibility: showCardOptions ? "visible" : "hidden" }}
      >
        <div className="text-slate-400 ">{createdTime}</div>

        <div className=" cursor-pointer">
            <span>
              <i
                className="mt-0 mr-[0.35rem] p-1 rounded-[50%] text-slate-400 cursor-pointer"
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPriorityModal(false);
                  setShowPalleteModal((show) => !show);
                }}
              >
                <ColorLensOutlinedIcon />
              </i>
              <i
                className="mt-0 mr-[0.35rem] p-1 rounded-[50%] text-slate-400 cursor-pointer"
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPalleteModal(false);
                  setShowPriorityModal((show) => !show);
                }}
              >
                <BarChartIcon />
              </i>
            </span>
            <i role="button" className="mt-0 mr-[0.35rem] p-1 rounded-[50%] text-slate-400 cursor-pointer">
                {inArchive ? 
                  (<UnarchiveOutlinedIcon onClick={(e)=> {
                    unArchiveNote(e,note)
                  }} />) : 
                  (<ArchiveOutlinedIcon onClick={(e) => {
                    archiveNote(e,note)}}
                     />)
                  }
            </i>
          <i role="button" className="mt-0 mr-[0.35rem] p-1 rounded-[50%] text-slate-400 cursor-pointer">
              <DeleteOutlinedIcon />
          </i>
        </div>
      </div>
      <div className="relative bottom-0 left-0">
        {showPalleteModal ? <PalleteModal note={note} /> : null}
      </div>
      <div className="relative bottom-0 left-0">
        {showPriorityModal ? <PriorityModal note={note} /> : null}
      </div>
    </div>
  );
};
