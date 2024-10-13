import React, { useState, useRef } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import TaskCard from "./TaskCard";
import {
  AiOutlinePlus,
  AiOutlineArrowRight,
  AiOutlineClose,
} from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { MdHourglassEmpty } from "react-icons/md";
import { motion } from "framer-motion";
import Users from "../../assets/images/Users.png"; // Ensure the path is correct

const MyTask = ({ todoCount, inProgressCount, completedCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleBrowseClick = () => fileInputRef.current.click();

  // Sample tasks array
  const tasks = [
    {
      id: 1,
      title: "Invoice and payment Backend integration",
      startDate: "18-06-2024",
      endDate: "22-06-2024",
      progress: 40,
      avatars: [Users, Users],
      status: "To do",
    },
    {
      id: 2,
      title: "UI Development",
      startDate: "20-06-2024",
      endDate: "25-06-2024",
      progress: 70,
      avatars: [Users, Users],
      status: "Progress",
    },
    {
      id: 3,
      title: "API Integration",
      startDate: "25-06-2024",
      endDate: "30-06-2024",
      progress: 100,
      avatars: [Users, Users],
      status: "Completed",
    },
    {
      id: 4,
      title: "UI Development",
      startDate: "20-06-2024",
      endDate: "25-06-2024",
      progress: 70,
      avatars: [Users, Users],
      status: "Progress",
    },
  ];

  return (
    <div className="mt-6 space-y-6 px-4 md:px-0">
      {/* Task Header Card */}
      <div className="p-6 bg-gray-100 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Your Task</h2>
          <div className="flex flex-wrap gap-2">
            {["Employee", "All Projects", "10", "All"].map(
              (placeholder, index) => (
                <select
                  key={index}
                  className="border border-gray-300 rounded-md p-2 text-sm w-full sm:w-auto"
                >
                  <option>{placeholder}</option>
                </select>
              )
            )}
            <button
              className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm w-full sm:w-auto"
              onClick={openModal}
            >
              Add Task <AiOutlinePlus className="inline-block ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Task Status Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* To Do Card */}

        <div>
          <div className="bg-white flex items-center justify-between p-4 rounded-xl shadow-lg transition-transform hover:scale-105 duration-200">
            <div className="flex items-center space-x-2 flex-wrap">
              <ReceiptLongIcon className="text-red-600" size={24} />
              <span className="text-brown-600 font-semibold text-sm truncate">
                To Do
              </span>
            </div>
            <div className="text-black-500 font-bold flex items-center space-x-1 text-xs sm:text-sm">
              <BsDot size={16} />
              <span>({todoCount})</span>
            </div>
          </div>
          {/* Render Task Cards Dynamically */}
          <div className="mt-4">
            {tasks
              .filter((task) => task.status === "To do")
              .map((task) => (
                <div className="mt-2" key={task.id}>
                  <TaskCard task={task} />
                </div>
              ))}
          </div>
        </div>

        {/* In Progress Card */}
        <div>
          <div className="bg-white flex items-center justify-between p-4 rounded-xl shadow-lg transition-transform hover:scale-105 duration-200">
            <div className="flex items-center space-x-2 flex-wrap">
              <MdHourglassEmpty className="text-blue-600" size={24} />
              <span className="text-blue-600 font-semibold text-sm truncate">
                In Progress
              </span>
            </div>
            <div className="text-blue-600 flex items-center space-x-1 text-xs sm:text-sm">
              <BsDot size={16} />
              <span>({inProgressCount})</span>
            </div>
          </div>
          {/* Render Task Cards Dynamically */}
          <div className="mt-4">
            {tasks
              .filter((task) => task.status === "Progress")
              .map((task) => (
                <div className="mt-4" key={task.id}>
                  <TaskCard task={task} />
                </div>
              ))}
          </div>
        </div>

        {/* Completed Card */}
        <div>
          <div className="bg-white flex items-center justify-between p-4 rounded-xl shadow-lg transition-transform hover:scale-105 duration-200">
            <div className="flex items-center space-x-2 flex-wrap">
              <EventAvailableIcon className="text-green-600" size={24} />
              <span className="text-green-600 font-semibold text-sm truncate">
                Completed
              </span>
            </div>
            <div className="text-green-600 flex items-center space-x-1 text-xs sm:text-sm">
              <AiOutlineArrowRight size={16} />
              <span>({completedCount})</span>
            </div>
          </div>
          {/* Render Task Cards Dynamically */}
          <div className="mt-4">
            {tasks
              .filter((task) => task.status === "Completed")
              .map((task) => (
                <div className="mt-2" key={task.id}>
                  <TaskCard task={task} />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="bg-white w-full max-w-lg mx-4 sm:mx-auto p-6 rounded-lg overflow-hidden relative"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">New Task</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            {/* Modal Content (Scrollable) */}
            <div className="h-[60vh] overflow-y-auto pr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Project Name",
                    type: "select",
                    options: ["Nothing selected"],
                  },
                  {
                    label: "Task Name",
                    type: "input",
                    placeholder: "Enter task or select task",
                  },
                  {
                    label: "Select Module",
                    type: "select",
                    options: ["Select module"],
                  },
                  { label: "Type", type: "select", options: ["Task"] },
                  {
                    label: "Actual Start Date",
                    type: "input",
                    inputType: "date",
                  },
                  {
                    label: "Actual Due Date",
                    type: "input",
                    inputType: "date",
                  },
                  {
                    label: "Select Start Time",
                    type: "input",
                    inputType: "time",
                  },
                  {
                    label: "Select Due Time",
                    type: "input",
                    inputType: "time",
                  },
                  {
                    label: "Assign To",
                    type: "select",
                    options: ["Select Assignee"],
                  },
                ].map((field, index) => (
                  <div className="space-y-2" key={index}>
                    <label className="block text-sm font-medium">
                      {field.label}{" "}
                      {field.type === "input" && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    {field.type === "select" ? (
                      <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                        {field.options.map((option, i) => (
                          <option key={i}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.inputType || "text"}
                        className="w-full border border-gray-300 rounded-md p-2 text-sm"
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  rows="4"
                ></textarea>
              </div>

              {/* Attachments Field */}
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium">Attachments</label>
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                  />
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full pr-24 text-sm"
                    placeholder="Upload multiple files"
                    readOnly
                  />
                  <button
                    onClick={handleBrowseClick}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white py-1 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm"
                  >
                    Browse
                  </button>
                </div>
                <p className="text-xs text-gray-500">Maximum file size: 5 MB</p>
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm w-full">
                  Submit Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTask;
