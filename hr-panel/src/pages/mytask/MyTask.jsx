import React, { useState, useRef } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { ImSpinner } from "react-icons/im";
import TaskCard from "./TaskCard";
import {
  AiOutlinePlus,
  AiOutlineArrowRight,
  AiOutlineClose,
} from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { MdHourglassEmpty } from "react-icons/md";
import Users from "../../assets/images/Users.png"; // Adjust path as needed

const MyTask = ({ todoCount, inProgressCount, completedCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    taskName: "",
    module: "",
    type: "",
    startDate: "",
    dueDate: "",
    startTime: "",
    dueTime: "",
    assignee: "",
    description: "",
    attachments: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const fileInputRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBrowseClick = () => fileInputRef.current.click();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? [...files] : value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.projectName) errors.projectName = "Project Name is required";
    if (!formData.taskName) errors.taskName = "Task Name is required";
    if (!formData.module) errors.module = "Module selection is required";
    if (!formData.startDate) errors.startDate = "Start Date is required";
    if (!formData.dueDate) errors.dueDate = "Due Date is required";
    if (!formData.startTime) errors.startTime = "Start Time is required";
    if (!formData.dueTime) errors.dueTime = "Due Time is required";
    if (!formData.assignee) errors.assignee = "Please assign the task";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
      closeModal();
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // Sample dynamic tasks array for integration
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
            {/* Employee Dropdown */}
            <select
              name="assignee"
              onChange={handleInputChange}
              onFocus={() => handleFocus("assignee")}
              onBlur={handleBlur}
              className={`border rounded-md p-2 text-sm w-full sm:w-auto ${
                focusedField === "assignee"
                  ? "border-[#3D3399]  shadow-[0_0_10px_3px_rgba(61,51,153,0.5)]"
                  : "border-gray-300"
              }`}
              required
            >
              <option value="" disabled selected>
                Select Employee
              </option>
              {["User A", "User B", "User C", "User D", "User E"].map(
                (employee, index) => (
                  <option key={index} value={employee}>
                    {employee}
                  </option>
                )
              )}
            </select>

            {/* All Projects Dropdown */}
            <select
              name="projectName"
              onChange={handleInputChange}
              onFocus={() => handleFocus("projectName")}
              onBlur={handleBlur}
              className={`border rounded-md p-2 text-sm w-full sm:w-auto ${
                focusedField === "projectName"
                  ? "border-[#3D3399]  shadow-[0_0_10px_3px_rgba(61,51,153,0.5)]"
                  : "border-gray-300"
              }`}
              required
            >
              <option value="" disabled selected>
                All Projects
              </option>
              {["AECearth", "AECearth Hub", "Jiffy", "AECP", "Blue Chip"].map(
                (project, index) => (
                  <option key={index} value={project}>
                    {project}
                  </option>
                )
              )}
            </select>

            <button
              className="bg-[#3D3399] text-white py-2 px-4 rounded-lg border border-[#3D3399] shadow-[0_0_10px_3px_rgba(61,51,153,0.5)] hover:bg-white hover:text-[#2B1F7D] hover:font-bold hover:shadow-[0_0_15px_5px_rgba(61,51,153,0.6)] transition duration-200 text-sm w-full sm:w-auto"
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
              <ImSpinner
                className="text-blue-600 animate-spin-slow"
                size={24}
              />
              <span className="text-blue-600 font-semibold text-sm truncate">
                In Progress
              </span>
            </div>
            <div className="text-blue-600 flex items-center space-x-1 text-xs sm:text-sm">
              <BsDot size={16} />
              <span>({inProgressCount})</span>
            </div>
          </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 overflow-auto">
          <div className="bg-white w-full max-w-3xl mx-4 sm:mx-auto p-6 rounded-lg relative overflow-hidden mt-60">
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

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Project Name Dropdown */}
                <div className="space-y-2 col-span-2">
                  <label className="block text-sm font-medium">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="projectName"
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("projectName")}
                    onBlur={handleBlur}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    required
                  >
                    <option value="" disabled selected>
                      Select Project
                    </option>
                    {[
                      "AECearth",
                      "AECearth Hub",
                      "Jiffy",
                      "AECP",
                      "Blue Chip",
                    ].map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Module Dropdown */}
                <div className="space-y-2 ">
                  <label className="block text-sm font-medium">
                    Select Module <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="module"
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    required
                  >
                    <option value="" disabled selected>
                      Select Module
                    </option>
                    {[
                      "Landing page",
                      "Onboarding questions",
                      "News Feed",
                      "Client Dashboard",
                      "Professional Dashboard",
                    ].map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Task Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Task Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="taskName"
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    required
                  />
                </div>

                {/* Type Dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    required
                  >
                    <option value="Task">Task</option>
                    <option value="Bug">Bug</option>
                    <option value="Improvement">Improvement</option>
                  </select>
                </div>

                {/* Actual Start Date and Actual Due Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Actual Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Actual Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    required
                  />
                </div>

                {/* Select Start Time and Select Due Time */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Select Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Select Due Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="dueTime"
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    required
                  />
                </div>

                {/* Assign To Dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Assign To <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="assignee"
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    required
                  >
                    <option value="" disabled>
                      Select Assignee
                    </option>
                    {["User A", "User B", "User C"].map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="block text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="description"
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    placeholder=""
                    required
                  />
                </div>

                {/* Checklist accepting only numbers */}
                <div className="space-y-2 col-span-2">
                  <label className="block text-sm font-medium">
                    Checklist (Numbers Only){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="checklist"
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Enter numbers only"
                    pattern="[0-9]*"
                    required
                  />
                </div>

                {/* Attachments */}
                <div className="space-y-2 col-span-2">
                  <label className="block text-sm font-medium">
                    Attachments
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      multiple
                      onChange={handleInputChange}
                      name="attachments"
                    />
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full pr-24 text-sm"
                      placeholder="Upload multiple files"
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={handleBrowseClick}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white py-1 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm"
                    >
                      Browse
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Maximum file size: 5 MB
                  </p>
                </div>

                {/* Submit Button */}
                <div className="col-span-2 mt-4 flex justify-center">
                  <button
                    type="submit"
                    className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm"
                  >
                    Submit Task
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTask;
