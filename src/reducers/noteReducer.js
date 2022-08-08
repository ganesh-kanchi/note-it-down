const noteReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_NOTES':
      return { ...state, notes: payload };
    case 'SET_ARCHIVED':
      return { ...state, archives: payload };
    case 'SET_TRASH':
      return { ...state, trash: payload };
    case 'SET_NOTES_AND_ARCHIVE':
      return { ...state, notes: payload.notes, archives: payload.archives };
    case 'SET_NOTES_AND_TRASH':
      return { ...state, notes: payload.notes, trash: payload.trash };
    case 'SET_ARCHIVE_AND_TRASH':
      return { ...state, archives: payload.archives, trash: payload.trash };
    default:
      return state;
  }
};

export { noteReducer };
