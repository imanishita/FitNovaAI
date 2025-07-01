// src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCrbW8EpbRYYzfz8R3YbDNydXiP8TBGzyU",
  authDomain: "fitnovaai-afa88.firebaseapp.com",
  projectId: "fitnovaai-afa88",
  storageBucket: "fitnovaai-afa88.appspot.com",
  messagingSenderId: "187705500979",
  appId: "1:187705500979:web:c6c83f4ed44a1913f70a46",
  measurementId: "G-C807LR217Y",
};


const app = initializeApp(firebaseConfig);


const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export {
  app,
  analytics,
  auth,
  provider,
  signInWithPopup,
  signOut,
};
