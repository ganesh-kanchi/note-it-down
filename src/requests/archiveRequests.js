import axios from "axios";

const getArchivedRequest = (token) => {
  return axios.get("/api/archives", { headers: { authorization: token } });
};

const archiveNoteRequest = (note, token) => {
  return axios.post(
    `/api/notes/archives/${note._id}`,
    { note },
    { headers: { authorization: token } }
  );
};

const deleteArchiveRequest = (note, token) => {
  return axios.post(
    `/api/notes/trash/${note._id}`,
    { note },
    { headers: { authorization: token } }
  );
};

const editArchiveRequest = (note, token) => {
  return axios.post(
    `/api/archives/${note._id}`,
    { note },
    { headers: { authorization: token } }
  );
};

const unArchiveNoteRequest = (note, token) => {
  return axios.post(
    `api/archives/restore/${note._id}`,
    { note },
    { headers: { authorization: token } }
  );
};

export { archiveNoteRequest, deleteArchiveRequest, editArchiveRequest, getArchivedRequest, unArchiveNoteRequest };
