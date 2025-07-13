import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./api/api";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
