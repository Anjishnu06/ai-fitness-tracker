import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSsOdCFR1cWWXS5zOiDT3y9TQyttCBzYU",
  authDomain: "ai-fitness-tracker-357d1.firebaseapp.com",
  projectId: "ai-fitness-tracker-357d1",
  storageBucket: "ai-fitness-tracker-357d1.firebasestorage.app",
  messagingSenderId: "138602501495",
  appId: "1:138602501495:web:32cfb2669e71cdefaefd72"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db , auth };