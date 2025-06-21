import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { auth, provider } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import AnimatedBackground from "./components/Background";
import { Typewriter } from "react-simple-typewriter";
import { FcGoogle } from "react-icons/fc";
import Navbar from "./components/Navbar";

const ActivitiesPage = () => (
  <div className="p-4">
    <ActivityForm onActivitiesAdded={() => window.location.reload()} />
    <ActivityList />
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Signup failed: " + error.message);
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
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen">
        <Navbar />

        {!user ? (
          <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="flex flex-col md:flex-row gap-12 items-center w-full max-w-6xl bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl p-10 shadow-2xl">
              
              {/* Left: Typewriter Text */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                  <Typewriter
                    words={["FitNova AI", "Track. Improve. Repeat.", "Get Fit with AI!"]}
                    loop
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </h1>
                <p className="text-xl opacity-80 text-gray-700 dark:text-gray-300 leading-relaxed">
                  Your personal AI fitness tracker that adapts to your goals and helps you achieve lasting results.
                </p>
              </div>

              {/* Right: Login / Signup Form */}
              <div style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ margin: '0 auto', width: '100%', maxWidth: '384px' }}>
                  <h2 style={{ 
                    marginTop: '40px', 
                    textAlign: 'center', 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: '#111827',
                    marginBottom: '40px'
                  }}>
                    Sign in to your account
                  </h2>
                </div>
                
                <div style={{ marginTop: '40px', margin: '0 auto', width: '100%', maxWidth: '384px' }}>
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                      <label htmlFor="email" style={{ 
                        display: 'block', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#111827',
                        marginBottom: '8px'
                      }}>
                        Email address
                      </label>
                      <div>
                        <input 
                          type="email" 
                          name="email" 
                          id="email" 
                          autoComplete="email" 
                          required 
                          style={{
                            display: 'block',
                            width: '100%',
                            borderRadius: '6px',
                            backgroundColor: '#ffffff',
                            padding: '6px 12px',
                            fontSize: '16px',
                            color: '#111827',
                            border: '1px solid #d1d5db',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" style={{ 
                        display: 'block', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#111827',
                        marginBottom: '8px'
                      }}>
                        Password
                      </label>
                      <div>
                        <input 
                          type="password" 
                          name="password" 
                          id="password" 
                          autoComplete="current-password" 
                          required 
                          style={{
                            display: 'block',
                            width: '100%',
                            borderRadius: '6px',
                            backgroundColor: '#ffffff',
                            padding: '6px 12px',
                            fontSize: '16px',
                            color: '#111827',
                            border: '1px solid #d1d5db',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={handleEmailLogin}
                        style={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'center',
                          borderRadius: '6px',
                          backgroundColor: '#4f46e5',
                          padding: '6px 12px',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#ffffff',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
                      >
                        Sign in
                      </button>
                      <button
                        type="button"
                        onClick={handleSignup}
                        style={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'center',
                          borderRadius: '6px',
                          backgroundColor: '#059669',
                          padding: '6px 12px',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#ffffff',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
                      >
                        Sign up
                      </button>
                    </div>
                  </form>

                  <div style={{ position: 'relative', margin: '24px 0' }}>
                    <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '100%', borderTop: '1px solid #d1d5db' }}></div>
                    </div>
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', fontSize: '14px' }}>
                      <span style={{ padding: '0 8px', backgroundColor: '#ffffff', color: '#6b7280' }}>or continue with</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogin}
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '12px',
                      borderRadius: '6px',
                      backgroundColor: '#ffffff',
                      padding: '6px 12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#111827',
                      border: '1px solid #d1d5db',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}
                  >
                    <FcGoogle style={{ fontSize: '20px' }} />
                    Sign in with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 min-h-screen bg-gray-100 dark:bg-[#0a0a0a] text-black dark:text-white">
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
      </div>
    </Router>
  );
}

export default App;