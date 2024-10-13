import React, { useState, useEffect } from "react";
import {
  FaUserAlt,
  FaClock,
  FaBuilding,
  FaEnvelope,
  FaCheck,
  FaPause,
  FaUserClock,
  FaSun,
  FaCloudSun,
  FaMoon,
  FaCloudMoon,
} from "react-icons/fa";
import { NavLink } from "react-router-dom"; 
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const [timeOfDay, setTimeOfDay] = useState("");
  const [date, setDate] = useState(new Date());

  // Function to determine time of day
  const determineTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeOfDay("Morning");
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay("Afternoon");
    } else if (hour >= 18 && hour < 21) {
      setTimeOfDay("Evening");
    } else {
      setTimeOfDay("Night");
    }
  };

  useEffect(() => {
    determineTimeOfDay();
  }, []);

  const getTimeOfDayIcon = () => {
    switch (timeOfDay) {
      case "Morning":
        return <FaSun className="text-6xl text-yellow-400 animate-pulse" />;
      case "Afternoon":
        return <FaCloudSun className="text-6xl text-orange-500 animate-pulse" />;
      case "Evening":
        return <FaCloudMoon className="text-6xl text-purple-500 animate-pulse" />;
      default:
        return <FaMoon className="text-6xl text-indigo-600 animate-pulse" />;
    }
  };

  return (
    <div className="p-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      {/* Progress Cards */}
      <NavLink to="/employees">
        <ProgressCard
          icon={<FaUserAlt className="text-pink-500 text-xl sm:text-2xl" />}
          title="Registered Employees"
          value="40"
          description="Total Employees"
          percentage={10}
        />
      </NavLink>
      <NavLink to="/attendance">
        <ProgressCard
          icon={<FaClock className="text-blue-500 text-xl sm:text-2xl" />}
          title="On Time Today"
          value="9"
          description="On Time Today"
          percentage={40}
        />
      </NavLink>
      <ProgressCard
        icon={<FaUserClock className="text-yellow-500 text-xl sm:text-2xl" />}
        title="On Time Today"
        value="9"
        description="On Time Today"
        percentage={30}
      />
      <NavLink to="/attendance">
        <ProgressCard
          icon={<FaPause className="text-teal-500 text-xl sm:text-2xl" />}
          title="Late Today"
          value="8"
          description="Late Today"
          percentage={50}
        />
      </NavLink>
      <NavLink to="/company-details/department">
        <ProgressCard
          icon={<FaBuilding className="text-gray-500 text-xl sm:text-2xl" />}
          title="Total Departments"
          value="8"
          description="Total Departments"
          percentage={70}
        />
      </NavLink>
      <NavLink to="/company-details/leave-policy/holidays">
        <ProgressCard
          icon={<FaEnvelope className="text-red-500 text-xl sm:text-2xl" />}
          title="Available Leave Types"
          value="2"
          description="Total Leaves"
          percentage={90}
        />
      </NavLink>
      <ProgressCard
        icon={<FaPause className="text-red-400 text-xl sm:text-2xl" />}
        title="Pending Leave Requests"
        value="7"
        description="Pending Leaves"
        percentage={70}
      />
      <ProgressCard
        icon={<FaCheck className="text-pink-400 text-xl sm:text-2xl" />}
        title="Approved Leaves"
        value="74"
        description="Approved Leaves"
        percentage={55}
      />

      {/* Calendar Section */}
      <div className="col-span-1 sm:col-span-2 md:col-span-4 bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Calendar */}
          <div className="lg:w-1/2 w-full">
            <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">
              Calendar
            </h2>
            <div className="w-full overflow-x-auto">
              <Calendar
                onChange={setDate}
                value={date}
                className="mx-auto lg:mx-0 w-full lg:w-auto bg-white p-4 rounded-2xl shadow-md"
                tileClassName="p-2 text-center hover:bg-gray-100 transition-all duration-200 rounded-lg"
              />
            </div>
            <p className="text-center lg:text-left text-lg mt-4">
              Today is: <span className="font-bold">{new Date().toDateString()}</span>
            </p>
          </div>

          {/* Time of Day Section */}
          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-teal-400 text-white p-6 rounded-3xl shadow-lg">
            {getTimeOfDayIcon()}
            <span className="text-2xl font-semibold mt-4">{timeOfDay}</span>
            <span className="text-lg mt-1">Have a great {timeOfDay}!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Progress Card Component
const ProgressCard = ({ icon, title, value, description, percentage }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0); // Reset progress to 0 on component mount
    const timer = setTimeout(() => {
      setProgress(percentage); // Animate to the desired percentage
    }, 100); // Delay for initial animation

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [percentage]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:scale-105 flex flex-col justify-between h-full">
      <div className="flex flex-col">
        <span className="text-gray-600 font-bold">{title}</span>
        <div className="flex items-center mt-1">
          <div className="flex-shrink-0">{icon}</div>
          <span className="text-2xl sm:text-3xl font-medium ml-2">{value}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <div className="mt-4">
        <div className="h-1 sm:h-2 bg-gray-200 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-teal-400"
            style={{
              width: `${progress}%`, // Corrected template literal
              transition: "width 1.5s ease-in-out", // Smooth animation over 1.5 seconds
            }}
          />
        </div>
        <p className="text-xs sm:text-sm text-gray-500 text-right mt-1">
          {progress}%
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
