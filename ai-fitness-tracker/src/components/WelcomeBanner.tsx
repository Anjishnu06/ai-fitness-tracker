import React from 'react';
import bannerImage from '../logo.jpg'; // Adjust the path to your image accordingly

const WelcomeBanner: React.FC = () => {
  return (
    <div className="bg-[#F2803A] text-white p-4 flex items-center rounded-lg shadow-lg animate-fade-in-down">
      <div className="flex-1 min-h-[100px] flex items-center space-x-4">
        <img src={bannerImage} alt="Fitness" className="h-24 mr-4 opacity-80 transform hover:scale-110 transition duration-300 ease-in-out" />
        <div>
          <h2 className="text-lg font-bold">Track Your Daily Activities</h2>
          <p className="text-sm leading-tight">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
