import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [isLoading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/auth/google");

      if (response.data?.authUrl) {
        window.location.href = response.data.authUrl;
      } else {
        console.error("No authentication URL returned from server.");
        setLoading(false); 
      }
    } catch (error: any) {
      console.error("Error logging in:", error.response?.data || error.message);
      setLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <div className="mt-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className={`w-full py-3 text-white rounded bg-blue-600 hover:bg-blue-700 flex items-center justify-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.1 0 5.8 1.1 7.9 3l5.9-5.9C33.7 3.6 29.1 1.5 24 1.5 14.9 1.5 7.4 7.9 4.8 16.1l6.9 5.4c1.8-5.4 7-9.5 12.3-9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.5 24c0-1.7-.1-3.4-.4-5H24v9.5h12.6c-.5 2.8-2.2 5.2-4.7 6.8l7.5 5.9c4.4-4 7-9.9 7-16.7z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.3 28.4c-.4-1.2-.6-2.4-.6-3.7s.2-2.5.6-3.7l-6.9-5.4C2.4 18.3 1.5 21 1.5 24s.9 5.7 2.3 8.4l6.5-5z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 46.5c5.1 0 9.7-1.7 13.1-4.6l-7.5-5.9c-2.1 1.4-4.7 2.2-7.6 2.2-5.3 0-9.8-3.6-11.4-8.5l-6.9 5.4c2.6 8.2 10.1 14.6 19 14.6z"
                  />
                </svg>
                <p>Sign in with Google Fitness</p>
              </div>
            )}
          </button>
          <p className="text-center text-gray-600 mt-2">
            Go back to{" "}
            <a href="/" className="text-[#F2803A] hover:underline font-medium">
              Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
