import React from 'react';
import { Sidebar } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { HiChartBar, HiUserCircle, HiBookOpen, HiVideoCamera, HiLogout } from "react-icons/hi";
import { useAuth } from '../contexts/authContext';

const LeftSideBar: React.FC = () => {
  const navigate = useNavigate();
  const {logOut} = useAuth();

  const handleLogout = async(e:React.FormEvent) => {
    e.preventDefault();
    try {
        await logOut();
        navigate("/");
    } catch (error) {
        console.error("Error logging out:", error);
    }
  };

  return (
    <Sidebar aria-label="Sidebar with fitness tracker features">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item onClick={() => navigate("/dashboard")} icon={HiChartBar}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item onClick={() => navigate("/workouts")} icon={HiUserCircle}>
            Workouts
          </Sidebar.Item>
          <Sidebar.Item onClick={() => navigate("/tutorials")} icon={HiBookOpen}>
            Tutorials
          </Sidebar.Item>
          <Sidebar.Item onClick={() => navigate("/blogs")} icon={HiVideoCamera}>
            Blogs
          </Sidebar.Item>
          <Sidebar.Item onClick={handleLogout} icon={HiLogout}>
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default LeftSideBar;
