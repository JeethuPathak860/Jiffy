import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Users from "../../assets/images/Users.png"; // Ensure the path is correct



const ModifyTask = () => {
  const { state } = useLocation(); // Access task and mode from state
  const { task, mode } = state || {
    task: {
      title: "Sample Task",
      status: "Todo",
      actualStartDate: "18-06-2024",
      actualEndDate: "22-06-2024",
      startDate: "nill",
      endDate: "nill",
      preferredTime: "10:45 PM - 07:48 PM",
      description: "Invoice and payment Backend integration",
    },
    mode: "edit",
  };

  const navigate = useNavigate(); // Initialize navigate
  const [taskStatus, setTaskStatus] = useState(task.status || "Todo");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleStatusChange = (e) => {
    setTaskStatus(e.target.value);
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageSubmit = () => {
    alert("Image Submitted!");
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 mt-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button onClick={handleBackClick} className="text-gray-500 hover:text-gray-700">
            <AiOutlineArrowLeft className="text-2xl" />
          </button>
          <h2 className="text-2xl font-bold text-gray-700 ml-4">{task.title || "Task Details"}</h2>
        </div>
        <hr className="border-gray-300 mb-4" />

        {/* Task Information */}
        <div className="space-y-4 overflow-y-auto max-h-[60vh]">
          {/* Status */}
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Status:</span>
            {mode === "edit" ? (
              <select
                value={taskStatus}
                onChange={handleStatusChange}
                className="border rounded-md p-2 bg-white focus:ring-blue-500 focus:border-blue-500 ml-4"
              >
                <option value="Todo">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            ) : (
              <span
                className={`ml-2 py-1 px-3 rounded-full ${
                  taskStatus === "Todo"
                    ? "bg-orange-200 text-orange-800"
                    : taskStatus === "In Progress"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {taskStatus}
              </span>
            )}
          </div>

          {/* Task Details */}
          <div className="flex flex-col space-y-4">
            {[
              { label: "Project Name:", value: "VMS" },
              { label: "Modules Name:", value: "Vendor Dashboard" },
              { label: "Category:", value: <button className="bg-blue-600 text-white text-sm py-1 px-4 rounded-lg shadow">Task</button> },
              { label: "Assigned By:", value: <img src="https://via.placeholder.com/40" alt="Assigned By Avatar" className="w-10 h-10 rounded-full border" /> },
              { label: "Assigned To:", value: <img src="https://via.placeholder.com/40" alt="Assigned To Avatar" className="w-10 h-10 rounded-full border" /> },
              { label: "Actual Start Date:", value: task.actualStartDate },
              { label: "Start Date:", value: task.startDate || "nill" },
              { label: "Actual End Date:", value: task.actualEndDate },
              { label: "End Date:", value: task.endDate || "nill" },
              { label: "Preferred Time:", value: task.preferredTime },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="font-semibold text-gray-700" style={{ width: "150px" }}>{item.label}</span>
                <span className="text-lg ml-4" style={{ width: "30px", textAlign: "center" }}>:</span>
                <span className="text-lg ml-2">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Task Description */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <label className="block text-sm font-medium text-gray-600">Task Description</label>
            <p className="text-gray-800">{task.description}</p>
          </div>

          {/* Image Upload */}
          {mode === "edit" && (
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <label className="block text-sm font-medium text-gray-600 mb-2">Upload Task Images</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />
              {selectedImage && <p className="mt-2 text-sm text-gray-600">Selected: {selectedImage.name}</p>}
              <button
                onClick={handleImageSubmit}
                className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg shadow"
              >
                Submit Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModifyTask;
