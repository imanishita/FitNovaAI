import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";

import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import Lottie from "lottie-react";
import animationData from "./assets/fitness.json";
import { Typewriter } from "react-simple-typewriter";
import { FcGoogle } from "react-icons/fc";
// import googleLogo from "./assets/googlelogo.webp"; // still commented out

const ActivitiesPage = () => (
  <div className="p-4">
    <ActivityForm onActivitiesAdded={() => window.location.reload()} />
    <ActivityList />
  </div>
);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Router>
      {!user ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-teal-600 px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl text-white max-w-5xl w-full">
            {/* Left animation */}
            <div className="flex-1 hidden md:block">
              <Lottie animationData={animationData} className="w-full max-w-sm" />
            </div>

            {/* Right login section */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-4">
                <Typewriter
                  words={["FitNova AI", "Track. Improve. Repeat.", "Get Fit with AI!"]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </h1>
              <p className="mb-6 text-sm">Please login to access your activities</p>

              {/* Clean, static Google login button */}
              <button
                onClick={handleLogin}
                className="bg-white text-black font-medium py-2 px-5 rounded-full shadow-sm flex items-center gap-2"
              >
                <FcGoogle className="text-xl" />
                 Sign in with Google
              </button>

              {/* 
              Uncomment to show custom image instead
              <img
                src={googleLogo}
                alt="Google"
                className="w-5 h-5 object-contain mt-4"
              />
              */}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 min-h-screen bg-gray-100">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition duration-300"
            >
              Logout
            </button>
          </div>
          <Routes>
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/" element={<Navigate to="/activities" replace />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
