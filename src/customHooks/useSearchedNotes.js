const useSearchedNotes = (notes, searchVal) => {
  return notes.filter((note) => {
    if (searchVal.trim() === "") {
      return note;
    } else if (
      note.title.toLowerCase().includes(searchVal.toLowerCase().trim()) ||
      note.content.toLowerCase().includes(searchVal.toLowerCase().trim())
    ) {
      return note;
    }
  });
};

export { useSearchedNotes };
