import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

interface AuthContextType {
  user: any;
  signUp: (email: string, password: string, userDetails: any) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Save user in session storage
        sessionStorage.setItem("user", JSON.stringify(currentUser));
        setUser(currentUser);
      } else {
        sessionStorage.removeItem("user");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign Up
  const signUp = async (email: string, password: string, userDetails: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        ...userDetails,
        createdAt: new Date(),
      });

      // Save user to session storage
      sessionStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  // Log In
  const logIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user to session storage
      sessionStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  // Log Out
  const logOut = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
