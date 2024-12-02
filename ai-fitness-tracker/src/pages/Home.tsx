import React from "react";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Hello, John</h1>
            <p className="text-gray-600">
              Welcome to the next level of fitness management! Our cutting-edge
              Gym Management Web App is designed to revolutionize your fitness
              center experience.
            </p>
          </div>
          <div className="flex items-center space-x-6 mt-6 md:mt-0">
            <div className="bg-yellow-100 p-4 rounded-md text-center">
              <h3 className="text-lg font-semibold">+2.3%</h3>
              <p className="text-sm text-gray-600">New Members</p>
              <p className="text-xs text-gray-500">
                Joined since 01 May compared with 01 Apr to 09 Apr
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-md text-center">
              <h3 className="text-lg font-semibold">+2.3%</h3>
              <p className="text-sm text-gray-600">Visitors This Month</p>
              <p className="text-xs text-gray-500">
                Visits from 01 May compared with 01 Apr to 09 Apr
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Weekly Schedule</h2>
            <a href="#" className="text-indigo-600 text-sm">
              View all &rarr;
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
            {/* Schedule Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Kickboxing"
                className="rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg mb-2">Kick Box Fred Dagg</h3>
              <p className="text-sm text-gray-600 mb-2">
                <i className="far fa-clock"></i> 05:30 - 06:30 am
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <i className="fas fa-map-marker-alt"></i> Group Fitness Room
              </p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-500">Popular</span>
                <span className="text-gray-500">1/25</span>
              </div>
            </div>

            {/* Schedule Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Yoga"
                className="rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg mb-2">Yoga with Alice</h3>
              <p className="text-sm text-gray-600 mb-2">
                <i className="far fa-clock"></i> 06:30 - 07:30 am
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <i className="fas fa-map-marker-alt"></i> Group Fitness Room
              </p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-500">Popular</span>
                <span className="text-gray-500">1/25</span>
              </div>
            </div>
            {/* Schedule Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Yoga"
                className="rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg mb-2">Yoga with Alice</h3>
              <p className="text-sm text-gray-600 mb-2">
                <i className="far fa-clock"></i> 06:30 - 07:30 am
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <i className="fas fa-map-marker-alt"></i> Group Fitness Room
              </p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-500">Popular</span>
                <span className="text-gray-500">1/25</span>
              </div>
            </div>
          </div>
        </div>
        {/* Activity Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {/* Activity Section 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Members Activity</h2>
            {/* Replace this with a chart component */}
            <div className="flex justify-center items-center h-40">
              <p>Pie Chart Placeholder</p>
            </div>
          </div>

          {/* Activity Section 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Visitors Activity</h2>
            {/* Replace this with a chart component */}
            <div className="flex justify-center items-center h-40">
              <p>Pie Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
