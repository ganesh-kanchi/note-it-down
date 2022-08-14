import {
    createContext,
    useContext,
    useState,
    useEffect,
    useReducer,
  } from "react";
  import { noteReducer } from "reducers/noteReducer";
  import { getNotesRequest,addNoteRequest, editNoteRequest, editArchiveRequest, archiveNoteRequest, unArchiveNoteRequest, deleteArchiveRequest } from "requests";
  import { useSelector } from "react-redux";
  
  const NotesContext = createContext();
  
  const initialFormInputs = {
    noteTitle: "",
    content: "<p><br></p>",
    labels: [],
    bgColor: "#F5F5F5",
    priority: { Low: "1" },
  };
  
  const NotesProvider = ({ children }) => {
    const { token } = useSelector(state=>state.auth);
  
    const [formInput, setFormInput] = useState(initialFormInputs);
    const [noteState, dispatchNote] = useReducer(noteReducer, {
      notes: [],
      archives: [],
      trash: [],
    });
    const [showInputModal, setShowInputModal] = useState(false);
    const [labelsArray, setLabelsArray] = useState([]);
    const [beingEdited, setBeingEdited] = useState(false);
    const [notesOrder, setNotesOrder] = useState({ sort: "", filter: "" });
  
    const noteExists = noteState.notes?.find((note) => note._id === formInput._id);
    const archiveExists = noteState.archives?.find(
      (note) => note._id === formInput._id
    );
  
    useEffect(() => {
      if (token!==null) {
        (async () => {
          const { data, status } = await getNotesRequest(token);
  
          if (status === 200) {
            dispatchNote({ type: 'SET_NOTES', payload: data.notes });
          }
        })();
      }
    }, [token]);
  
    const updateNoteHandler = async (currentNote) => {
  
      const archiveExists = noteState.archives?.find(
        (note) => note._id === currentNote._id
      );
      
      if (archiveExists) {
        try {
          const { data, status } = await editArchiveRequest(
            {
              ...archiveExists,
              title: currentNote.title.trim(),
              content: currentNote.content.trim(),
              tags: currentNote.tags,
              bgColor: currentNote.bgColor,
              priority: currentNote.priority,
            },
            token
          );
  
          if (status === 201) {
            dispatchNote({
              type: 'SET_ARCHIVED',
              payload: data.archives,
            });
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          const { data, status } = await editNoteRequest(
            {
              ...currentNote,
              noteTitle: currentNote.noteTitle.trim(),
              content: currentNote.content.trim(),
              labels: currentNote.labels,
              bgColor: currentNote.bgColor,
              priority: currentNote.priority,
            },
            token
          );
  
          if (status === 201) {
            dispatchNote({
              type: 'SET_NOTES',
              payload: data.notes,
            });
          }
        } catch (err) {
          console.error(err);
        }
      }
      
    };
  
    const submitForm = async (e) => {
      e.preventDefault();
      if (noteExists) {
        try {
          const { data, status } = await editNoteRequest(
            {
              ...noteExists,
              noteTitle: formInput.noteTitle.trim(),
              content: formInput.content.trim(),
              labels: formInput.labels,
              bgColor: formInput.bgColor,
              priority: formInput.priority,
            },
            token
          );
  
          if (status === 201) {
            dispatchNote({
              type: 'SET_NOTES',
              payload: data.notes,
            });
          }
        } catch (err) {
          console.error(err);
        }
      } else if (archiveExists) {
        try {
          const { data, status } = await editArchiveRequest(
            {
              ...archiveExists,
              title: formInput.title.trim(),
              content: formInput.content.trim(),
              tags: formInput.tags,
              bgColor: formInput.bgColor,
              priority: formInput.priority,
            },
            token
          );
  
          if (status === 201) {
            dispatchNote({
              type: 'SET_ARCHIVED',
              payload: data.archives,
            });
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          const { data, status } = await addNoteRequest(
            {
              ...formInput,
              labels: formInput.labels,
              bgColor: formInput.bgColor,
              priority: formInput.priority,
              createdTime: new Date().toLocaleString(),
            },
            token
          );
  
          if (status === 201) {
            dispatchNote({
              type: 'SET_NOTES',
              payload: data.notes,
            });
          }
        } catch (err) {
          console.error(err);
        }
      }
      closeNoteModal();
    };

    const archiveNote = async (e, note) => {
      e.stopPropagation();
  
      try {
        const { data, status } = await archiveNoteRequest(note, token);
  
        if (status === 201) {
          dispatchNote({
            type: 'SET_NOTES_AND_ARCHIVE',
            payload: { notes: data.notes, archives: data.archives },
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    const unArchiveNote = async (e, note) => {
      e.stopPropagation();
  
      try {
        const { data, status } = await unArchiveNoteRequest(note, token);
  
        if (status === 200) {
          dispatchNote({
            type: 'SET_NOTES_AND_ARCHIVE',
            payload: { notes: data.notes, archives: data.archives },
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    const deleteArchivedNote = async (e, note) => {
      e.stopPropagation();
  
      try {
        const { data, status } = await deleteArchiveRequest(note, token);
  
        if (status === 200) {
          dispatchNote({
            type: 'SET_ARCHIVE_AND_TRASH',
            payload: { archives: data.archives, trash: data.trash },
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    const closeNoteModal = () => {
      setFormInput(initialFormInputs);
      setShowInputModal(false);
      setBeingEdited(false);
    };
  
    return (
      <NotesContext.Provider
        value={{
          formInput,
          setFormInput,
          initialFormInputs,
          noteState,
          dispatchNote,
          showInputModal,
          setShowInputModal,
          submitForm,
          noteExists,
          archiveExists,
          closeNoteModal,
          labelsArray,
          setLabelsArray,
          beingEdited,
          setBeingEdited,
          updateNoteHandler,
          notesOrder,
          setNotesOrder,
          archiveNote,
          unArchiveNote,
          deleteArchivedNote
        }}
      >
        {children}
      </NotesContext.Provider>
    );
  };
  
  const useNotes = () => useContext(NotesContext);
  
  export { NotesProvider, useNotes };
  