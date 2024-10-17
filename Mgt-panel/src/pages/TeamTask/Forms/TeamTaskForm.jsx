import React, { useState, useRef } from "react";

const TeamTaskForm = ({ closeModal }) => {
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
  const fileInputRef = useRef(null);

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

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Project Name */}
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            className={`mt-1 p-2 border border-gray-300 rounded w-full ${formErrors.projectName ? "border-red-600" : ""}`}
          />
          {formErrors.projectName && <span className="text-red-600 text-sm">{formErrors.projectName}</span>}
        </div>

        {/* Task Name */}
        <div>
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">Task Name</label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={formData.taskName}
            onChange={handleInputChange}
            className={`mt-1 p-2 border border-gray-300 rounded w-full ${formErrors.taskName ? "border-red-600" : ""}`}
          />
          {formErrors.taskName && <span className="text-red-600 text-sm">{formErrors.taskName}</span>}
        </div>

        {/* Module */}
        <div>
          <label htmlFor="module" className="block text-sm font-medium text-gray-700">Module</label>
          <select
            id="module"
            name="module"
            value={formData.module}
            onChange={handleInputChange}
            className={`mt-1 p-2 border border-gray-300 rounded w-full ${formErrors.module ? "border-red-600" : ""}`}
          >
            <option value="">Select a module</option>
            <option value="UI">UI</option>
            <option value="Backend">Backend</option>
            <option value="API">API</option>
          </select>
          {formErrors.module && <span className="text-red-600 text-sm">{formErrors.module}</span>}
        </div>

        {/* Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className={`mt-1 p-2 border border-gray-300 rounded w-full`}
          >
            <option value="">Select a type</option>
            <option value="Feature">Feature</option>
            <option value="Bug">Bug</option>
            <option value="Task">Task</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className={`mt-1 p-2 border border-gray-300 rounded w-full ${formErrors.startDate ? "border-red-600" : ""}`}
          />
          {formErrors.startDate && <span className="text-red-600 text-sm">{formErrors.startDate}</span>}
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            className={`mt-1 p-2 border border-gray-300 rounded w-full ${formErrors.dueDate ? "border-red-600" : ""}`}
          />
          {formErrors.dueDate && <span className="text-red-600 text-sm">{formErrors.dueDate}</span>}
        </div>

        {/* Start Time */}
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className={`mt-1 p-2 border border-gray-300 rounded w-full ${formErrors.startTime ? "border-red-600" : ""}`}
          />
          {formErrors.startTime && <span className="text-red-600 text-sm">{formErrors.startTime}</span>}
        </div>

        {/* Due Time */}
        <div>
          <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700">Due Time</label>
          <input
            type="time"
            id="dueTime"
            name="dueTime"
            value={formData.dueTime}
            onChange={handleInputChange}
            className={`mt-1 p-2 border border-gray-300 rounded w-full ${formErrors.dueTime ? "border-red-600" : ""}`}
          />
          {formErrors.dueTime && <span className="text-red-600 text-sm">{formErrors.dueTime}</span>}
        </div>

        {/* Assignee */}
        <div>
          <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">Assignee</label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleInputChange}
            className={`mt-1 p-2 border border-gray-300 rounded w-full ${formErrors.assignee ? "border-red-600" : ""}`}
          />
          {formErrors.assignee && <span className="text-red-600 text-sm">{formErrors.assignee}</span>}
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        {/* Attachments */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Attachments</label>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleInputChange}
            className="hidden"
          />
          <button type="button" onClick={handleBrowseClick} className="mt-1 bg-gray-200 text-gray-700 py-2 px-4 rounded">Browse</button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
      </div>
    </form>
  );
};

export default TeamTaskForm;
