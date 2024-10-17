import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditTeam from './EditTeam'; 
import { motion, AnimatePresence } from "framer-motion";

const CreateTeamCards = ({ teams = [], setTeams }) => {
  const [progressValues, setProgressValues] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(-1);
  const [editTeamData, setEditTeamData] = useState(null);
  const [teamToDelete, setTeamToDelete] = useState(null);

  useEffect(() => {
    const animateProgress = () => {
      const animatedValues = teams.map(() => 0);
      setProgressValues(animatedValues);

      teams.forEach((team, index) => {
        let currentProgress = 0;
        const targetProgress = team.progress;

        const interval = setInterval(() => {
          if (currentProgress < targetProgress) {
            currentProgress++;
            setProgressValues((prev) => {
              const updatedValues = [...prev];
              updatedValues[index] = currentProgress;
              return updatedValues;
            });
          } else {
            clearInterval(interval);
          }
        }, 50);
      });
    };

    animateProgress();
  }, [teams]);

  const handleDropdownToggle = (index) => {
    setDropdownVisible((prev) => (prev === index ? -1 : index));
  };

  const handleEdit = (team) => {
    setEditTeamData(team);
  };

  const handleDelete = (team) => {
    setTeamToDelete(team);
  };

  const confirmDelete = (team) => {
    setTeams((prevTeams) => prevTeams.filter((t) => t !== team));
    setTeamToDelete(null);
  };

  const closeModal = () => {
    setEditTeamData(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {Array.isArray(teams) && teams.length > 0 ? (
        teams.map((team, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl relative w-80 overflow-hidden"
          >
            {/* Circular Progress Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-24 h-24">
                <CircularProgressbar
                  value={progressValues[index]}
                  text={`${progressValues[index]}%`}
                  styles={buildStyles({
                    pathColor: progressValues[index] === 100 ? "#4CAF50" : "#FF6347",
                    textColor: progressValues[index] === 100 ? "#4CAF50" : "#FF6347",
                    textSize: "16px",
                    trailColor: "#d6d6d6",
                  })}
                />
              </div>
              {/* Dropdown Toggle */}
              <div className="relative">
                <BsThreeDotsVertical
                  className="text-gray-600 cursor-pointer"
                  onClick={() => handleDropdownToggle(index)}
                />
                {dropdownVisible === index && (
                  <div className="absolute right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-10">
                    <button
                      onClick={() => handleEdit(team)}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(team)}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Card Content */}
            <h2 className="font-bold text-lg text-blue-600 mb-1">{team.teamName}</h2>
            <p className="text-gray-600 text-sm mb-3">{team.description}</p>
            <p className="text-gray-600 text-sm">
              Members: <span className="font-semibold">{team.members.join(", ")}</span>
            </p>
          </div>
        ))
      ) : (
        <p>No teams available.</p>
      )}

      {/* Modal for Editing */}
      <AnimatePresence>
        {editTeamData && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md mx-4 sm:mx-auto p-6 rounded-lg shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <EditTeam initialData={editTeamData} onClose={closeModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for Delete Confirmation */}
      <AnimatePresence>
        {teamToDelete && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
              <p className="mb-4">
                Are you sure you want to delete the team{" "}
                <strong>{teamToDelete.teamName}</strong>?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setTeamToDelete(null)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDelete(teamToDelete)}
                  className="bg-red-600 text-white py-2 px-4 rounded-md"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateTeamCards;
