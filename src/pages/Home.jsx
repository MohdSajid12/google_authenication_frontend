import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLogo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: 8 }}
  >
    <path
      fill="#4285F4"
      d="M17.64 9.2045c0-.638-.057-1.25-.163-1.837H9v3.48h4.844a4.14 4.14 0 01-1.796 2.72v2.26h2.91c1.703-1.57 2.682-3.88 2.682-6.624z"
    />
    <path
      fill="#34A853"
      d="M9 18c2.43 0 4.474-.8 5.966-2.17l-2.91-2.26c-.8.54-1.825.86-3.056.86-2.348 0-4.337-1.584-5.045-3.71H1.96v2.33A8.995 8.995 0 009 18z"
    />
    <path
      fill="#FBBC05"
      d="M3.955 10.72a5.4 5.4 0 010-3.44V4.95H1.96a9.005 9.005 0 000 8.1l1.995-2.33z"
    />
    <path
      fill="#EA4335"
      d="M9 3.56c1.32 0 2.5.454 3.43 1.346l2.57-2.57A8.94 8.94 0 009 0 8.995 8.995 0 001.96 4.95l1.995 2.33C4.664 5.144 6.652 3.56 9 3.56z"
    />
  </svg>
);

const Home = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/upload");
    }
  }, [user, navigate]);

  return (
    <div className="home-container">
      {!user && (
        <>
          <h2>Welcome</h2>
          <p>Please sign in to continue.</p>
          <a href="http://localhost:5000/auth/google" className="google-login-btn">
            <GoogleLogo />
            Sign in with Google
          </a>
        </>
      )}
    </div>
  );
};

export default Home;
