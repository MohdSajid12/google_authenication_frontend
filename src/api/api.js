import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", 
  withCredentials: true, 
});

export const getCurrentUser = () => API.get("/auth/current_user");
export const logout = () => API.get("/auth/logout");
export const getMedia = async () => {
  const res = await axios.get("http://localhost:5000/media", { withCredentials: true });
  return res;
};

export const uploadFile = (formData) => API.post("/media/upload", formData);
export const deleteFile = async (id) => {
  return axios.delete(`http://localhost:5000/media/${id}`, { withCredentials: true });
};