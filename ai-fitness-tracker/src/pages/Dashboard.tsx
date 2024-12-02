import React, { useEffect, useState } from "react";
import NavbarAfterLogin from "../components/NavbarAfterLogin";
import WelcomeBanner from "../components/WelcomeBanner";
import StatsCard from "../components/StatsCard";
import GoalProgress from "../components/GoalProgress";
import FoodCalculator from "../components/FoodCalculator";
import { HiOutlineClock, HiFire, HiOutlineAdjustments } from "react-icons/hi";
import axios from "axios";

const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1]; // Get the payload part
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [fitnessData, setFitnessData] = useState<any>(null);

  useEffect(() => {
    // Parse the JWT token from the URL after Google redirects to /dashboard
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      // Store the JWT token in localStorage
      localStorage.setItem("jwtToken", token);

      // Decode the JWT to get the user's name
      const decodedToken = decodeJWT(token);
      if (decodedToken && decodedToken.displayName) {
        console.log("User name:", decodedToken.displayName);
        setUserName(decodedToken.displayName);
      } else {
        console.error("Failed to retrieve displayName from token");
      }
    } else {
      console.error("No token found in the URL");
    }

    // Function to fetch fitness data
    const fetchFitnessData = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const jwtToken = localStorage.getItem("jwtToken");

        if (!jwtToken) {
          console.error("No JWT token found");
          return;
        }

        // Set up the headers for the request
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };

        // Make the request to fetch data
        const response = await axios.get("http://localhost:8000/fetch-data", config);
        console.log("Fitness Data:", response.data);
        setFitnessData(response.data); // Store the data in state for later manipulation
      } catch (error: any) {
        console.error("Error fetching fitness data:", error.response?.data || error.message);
      }
    };

    // Call fetchFitnessData
    fetchFitnessData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavbarAfterLogin userName={userName} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <WelcomeBanner />
        <div className="flex space-x-4 pt-4">
          <StatsCard
            title="Workout"
            value="4 hrs"
            Icon={HiOutlineClock}
            color="blue"
          />
          <StatsCard
            title="Calories"
            value="1800 kcal"
            Icon={HiFire}
            color="orange"
          />
          <StatsCard
            title="Steps"
            value="2200 steps"
            Icon={HiOutlineAdjustments}
            color="purple"
          />
        </div>
        <div className="flex flex-wrap md:flex-nowrap justify-between items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 mt-10 mb-10">
            <GoalProgress />
          </div>
          <div className="w-full md:w-96">
            <FoodCalculator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
