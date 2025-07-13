import axios from "axios";
const API = axios.create({
  baseURL: "https://google-authenication-backend.vercel.app",
  withCredentials: true,
});

export const getCurrentUser = () => API.get("/auth/current_user");

export const logout = () => API.get("/auth/logout");

export const getMedia = async () => {
  const res = await API.get("/media");
  return res;
};

export const uploadFile = (formData) => API.post("/media/upload", formData);

export const deleteFile = async (id) => {
  return API.delete(`/media/${id}`);
};
