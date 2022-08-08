import { NoteCardsList, NoteInputModal } from "components";
import { useNotes } from "contexts/notesContext";

export const HomePage = () => {
    const {noteState: { notes }, showInputModal} = useNotes();

    return (
        <div className="flex flex-col items-center p-4 w-full">
            {showInputModal ? <NoteInputModal /> : null}

            <NoteCardsList notes={notes} />

        </div>
    )
} 