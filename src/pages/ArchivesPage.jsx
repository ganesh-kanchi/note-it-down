import { useNotes } from "contexts/notesContext";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getArchivedRequest } from "requests/archiveRequests";
import { NoteCardsList, NoteInputModal } from "components";

export const ArchivesPage = () => {
    const {token} = useSelector(state=> state.auth);
    const {showInputModal, noteState: {archives}, dispatchNote} = useNotes();
    useEffect(() => {
        (async () => {
            const { data, status } = await getArchivedRequest(token);
    
            if (status === 200) {
              dispatchNote({ type: 'SET_ARCHIVED', payload: data.archives });
            }
        })();
      }, [token, dispatchNote]);
    return (
        <div className="p-4 w-full">
            <NoteCardsList notes={archives} />
            {showInputModal ? <NoteInputModal /> : null}
        </div>
    )
}