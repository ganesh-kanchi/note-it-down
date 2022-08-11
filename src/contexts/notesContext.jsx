import {
    createContext,
    useContext,
    useState,
    useEffect,
    useReducer,
  } from "react";
  import { noteReducer } from "reducers/noteReducer";
  import { getNotesRequest,addNoteRequest, editNoteRequest } from "requests";
  import { useSelector } from "react-redux";
  
  const NotesContext = createContext();
  
  const initialFormInputs = {
    noteTitle: "",
    content: "<p><br></p>",
    tags: [],
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
  
      
        try {
          const { data, status } = await editNoteRequest(
            {
              ...currentNote,
              noteTitle: currentNote.noteTitle.trim(),
              content: currentNote.content.trim(),
              tags: currentNote.tags,
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
              tags: formInput.tags,
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
      } else {
        try {
          const { data, status } = await addNoteRequest(
            {
              ...formInput,
              tags: formInput.tags,
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
          setNotesOrder
        }}
      >
        {children}
      </NotesContext.Provider>
    );
  };
  
  const useNotes = () => useContext(NotesContext);
  
  export { NotesProvider, useNotes };
  