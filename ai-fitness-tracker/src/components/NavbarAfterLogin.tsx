import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdNotificationsNone, MdMenu } from "react-icons/md";  // Added MdMenu for the hamburger icon
import logo from "../logo.jpg";
import { useAuth } from "../contexts/authContext";
import LeftSideBar from "./LeftSideBar"; // Ensure this path is correct

interface NavbarAfterLoginProps {
  userName?: string;
}

const NavbarAfterLogin: React.FC<NavbarAfterLoginProps> = ({ userName }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await logOut();
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="bg-white flex justify-between items-center p-4 shadow-md">
        <button onClick={toggleSidebar} className="md:hidden text-xl">
          <MdMenu />
        </button>
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Company Logo" className="h-10 mr-2" />
        </Link>
        <div className="hidden md:flex space-x-4 pl-24">
          <Link to="/dashboard" className="text-gray-800 hover:text-white hover:bg-[#F2803A] px-3 py-2 rounded-md">Dashboard</Link>
          <Link to="/workouts" className="text-gray-800 hover:text-white hover:bg-[#F2803A] px-3 py-2 rounded-md">Workouts</Link>
          <Link to="/tutorials" className="text-gray-800 hover:text-white hover:bg-[#F2803A] px-3 py-2 rounded-md">Tutorials</Link>
          <Link to="/blogs" className="text-gray-800 hover:text-white hover:bg-[#F2803A] px-3 py-2 rounded-md">Blogs</Link>
        </div>
        <div className="flex items-center space-x-4">
          {/* Use the userName prop if it is provided */}
          <span className="text-gray-800">
            Welcome {userName ? userName : "User"}
          </span>
          <MdNotificationsNone className="text-2xl text-gray-800 hover:text-f2803a cursor-pointer" />
          <button
            className="bg-f2803a text-white px-4 py-2 rounded bg-[#F2803A]"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      {isSidebarOpen && <LeftSideBar />}
    </>
  );
};

export default NavbarAfterLogin;
