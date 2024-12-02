import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./tailwind.css";
import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter as Router } from "react-router-dom";
import 'flowbite';
import { GoogleOAuthProvider } from '@react-oauth/google'; 

const clientId = '30130183594-a154rii2r45qlm3o2ke7rjp34nh1lu0m.apps.googleusercontent.com';  

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <App />
      </AuthProvider>
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
