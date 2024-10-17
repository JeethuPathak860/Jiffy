import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsThreeDotsVertical } from "react-icons/bs";

const CreateTeamCards = ({ teams }) => {
  const [progressValues, setProgressValues] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(-1); // -1 means no dropdown is open

  useEffect(() => {
    const animateProgress = () => {
      const animatedValues = teams.map(() => 0); // Start from 0%
      setProgressValues(animatedValues);

      teams.forEach((team, index) => {
        let currentProgress = 0; // Start from 0
        const targetProgress = team.progress;

        const interval = setInterval(() => {
          if (currentProgress < targetProgress) {
            currentProgress++; // Increment progress
            setProgressValues((prev) => {
              const updatedValues = [...prev];
              updatedValues[index] = currentProgress; // Update progress value for each team
              return updatedValues;
            });
          } else {
            clearInterval(interval); // Stop the interval when reaching the target
          }
        }, 50); // Adjust the interval duration for speed
      });
    };

    animateProgress();
  }, [teams]);

  const handleDropdownToggle = (index) => {
    setDropdownVisible((prev) => (prev === index ? -1 : index)); // Toggle dropdown
  };

  const handleEdit = (team) => {
    // Implement your edit logic here
    console.log("Edit:", team);
  };

  const handleDelete = (team) => {
    // Implement your delete logic here
    console.log("Delete:", team);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.map((team, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-4 transition-transform hover:scale-105 duration-200 border border-gray-200 relative w-80"
        >
          {/* Top Section with Progress Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-20 h-20">
              {" "}
              {/* Circular Progress Bar Size */}
              <CircularProgressbar
                value={progressValues[index]}
                text={`${progressValues[index]}%`}
                styles={buildStyles({
                  pathColor:
                    progressValues[index] === 100 ? "#4CAF50" : "#FF6347",
                  textColor:
                    progressValues[index] === 100 ? "#4CAF50" : "#FF6347",
                })}
              />
            </div>
            <div className="relative">
              <BsThreeDotsVertical
                className="text-gray-600 cursor-pointer"
                onClick={() => handleDropdownToggle(index)}
              />
              {dropdownVisible === index && (
                <div className="absolute right-0 bg-white border border-gray-200 rounded shadow-lg mt-1 z-10">
                  <button
                    onClick={() => handleEdit(team)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(team)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Team Information */}
          <h2 className="font-bold text-lg text-blue-600">{team.teamName}</h2>
          <p className="text-gray-600 text-sm mb-2">{team.description}</p>
          <p className="text-gray-600 text-sm">
            Members: {team.members.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CreateTeamCards;
