export const notesSortedBasedOnDate = (notes, sortBy) => {
  if (sortBy === "latest") {
    return [...notes].sort(
      (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
    );
  } else if (sortBy === "oldest") {
    return [...notes].sort(
      (a, b) => new Date(a.createdTime) - new Date(b.createdTime)
    );
  }
  return notes;
};
