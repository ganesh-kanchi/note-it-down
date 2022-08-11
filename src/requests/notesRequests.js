import axios from "axios";

const addNoteRequest = (note, token) => {
  return axios.post(
    "/api/notes",
    { note },
    { headers: { authorization: token } }
  );
};

const editNoteRequest = (note, token) => {
  return axios.post(
    `/api/notes/${note._id}`,
    { note },
    { headers: { authorization: token } }
  );
};

const getNotesRequest = (token) => {
  return axios.get("/api/notes", { headers: { authorization: token } });
};

export { addNoteRequest, editNoteRequest, getNotesRequest };
