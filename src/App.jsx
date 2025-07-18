import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import { getCurrentUser } from "./api/api"; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data.user || null);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setUser(null);
      } else {
        console.error("Error fetching user:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/upload"
          element={
            user ? <Upload user={user} /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;  
