import React from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import {Routes,Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
