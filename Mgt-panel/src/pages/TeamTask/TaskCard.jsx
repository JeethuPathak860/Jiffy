import React, { useState } from "react";
import { MdOutlineCalendarToday } from "react-icons/md";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const { title, startDate, endDate, progress, avatars } = task;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleView = () => {
    navigate(`/modify-task/view`, { state: { task, mode: 'view' } });
  };

  const handleEdit = () => {
    navigate(`/modify-task/edit`, { state: { task, mode: 'edit' } });
  };

  const handleDelete = () => {
    // Handle the delete action (e.g., call an API or update state)
    console.log("Task deleted");
    setIsModalOpen(false); // Close the modal after delete
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="relative">
          <button onClick={toggleDropdown} className="text-gray-400 hover:text-gray-600">
            <span className="text-lg">•••</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg z-10">
              <div className="flex flex-col rounded-xl overflow-hidden">
                <button onClick={handleView} className="flex items-center p-2 hover:bg-gray-100">
                  <AiOutlineEye className="mr-2 text-gray-600" />
                  <span className="text-gray-800">View</span>
                </button>
                <button onClick={handleEdit} className="flex items-center p-2 hover:bg-gray-100">
                  <AiOutlineEdit className="mr-2 text-gray-600" />
                  <span className="text-gray-800">Edit</span>
                </button>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center p-2 hover:bg-gray-100">
                  <AiOutlineDelete className="mr-2 text-gray-600" />
                  <span className="text-gray-800">Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Date Range */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
        <div className="flex items-center space-x-1">
          <MdOutlineCalendarToday size={16} className="text-orange-500" />
          <span>{startDate}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MdOutlineCalendarToday size={16} className="text-green-500" />
          <span>{endDate}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1 rounded-full mb-4">
        <div className="bg-orange-500 h-1 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Avatars */}
      <div className="flex items-center mb-4">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt="User Avatar"
            className={`w-8 h-8 rounded-full border-2 border-white -ml-2 ${index === 0 ? "ml-0" : ""}`}
          />
        ))}
      </div>

      {/* Align Task button to the right */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white text-sm py-1 px-4 rounded-lg hover:bg-blue-700">
          Task
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this task?</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsModalOpen(false)} className="mr-2 bg-gray-300 text-gray-700 py-1 px-4 rounded-lg">Cancel</button>
              <button onClick={handleDelete} className="bg-red-600 text-white py-1 px-4 rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
