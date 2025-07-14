import axios from "axios";

const API = axios.create({
  baseURL: "https://google-authenication-backend.vercel.app",
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");  // JWT saved on login redirect
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCurrentUser = () => API.get("/auth/current_user");

export const logout = () => {
  localStorage.removeItem("token");
  return API.get("/auth/logout");
};

export const getMedia = async () => {
  const res = await API.get("/media");
  return res;
};

export const uploadFile = (formData) => API.post("/media/upload", formData);

export const deleteFile = async (id) => {
  return API.delete(`/media/${id}`);
};
