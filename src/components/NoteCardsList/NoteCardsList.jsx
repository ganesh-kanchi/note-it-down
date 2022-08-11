import { NoteCard } from "components";
import { useNotes } from "contexts/notesContext";
import {
  notesSortedBasedOnDate,
  notesSortedBasedOnPriority,
  notesFilteredBasedOnPriority,
} from "utils";

export const NoteCardsList = ({ notes }) => {
  const { notesOrder } = useNotes();

  const sortedByDate = notesSortedBasedOnDate(notes, notesOrder.sort);
  const sortedByPriority = notesSortedBasedOnPriority(
    sortedByDate,
    notesOrder.sort
  );
  const filterByPriority = notesFilteredBasedOnPriority(
    sortedByPriority,
    notesOrder.filter
  );
  const filteredNotes = filterByPriority;

  return (
    <div className="z-[1]">
      <div className="flex flex-col max-w-[25rem] mt-0 mr-auto mb-4 ml-auto flex-wrap">
        {filteredNotes?.length > 0 ? (
          filteredNotes?.map((unPinnedNote) => {
            return <NoteCard note={unPinnedNote} key={unPinnedNote._id} />;
          })
        ) : (
          <p className="text-center">We don't have any notes to show here.</p>
        )}
      </div>
    </div>
  );
};
