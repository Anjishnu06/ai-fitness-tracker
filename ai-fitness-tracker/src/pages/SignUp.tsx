import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signUp(email, password, { name });
      alert("Sign up successful!");
      navigate("/login"); // Redirect to login page
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full py-3 text-white rounded hover:opacity-90"
            style={{
              backgroundColor: "#F2803A", // Button background color
            }}
          >
            Sign Up
          </button>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </a>
        </p>
        <p className="text-center text-gray-600 mt-2">
          Go back to{" "}
          <a
            href="/"
            className="text-[#F2803A] hover:underline font-medium"
          >
            Home
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
