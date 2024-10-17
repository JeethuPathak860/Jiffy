import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for back navigation

const EditTask = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: '',
    module: 'HR', 
    taskName: '',
    assignee: '',
    startDate: '',
    dueDate: '',
    startTime: '',
    dueTime: '',
    type: 'Bug',
    description: '',
    checklist: '',
    attachment: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data: ", formData);
  };

  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-md w-full max-w-3xl">
        <div className="flex justify-between p-4 border-b">
          <button onClick={handleBack} className="text-blue-500 hover:underline">
            &#8592; Back
          </button>
          <h1 className="text-xl font-semibold text-center">Edit Task Details</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Project Name */}
          <div>
            <label className="block text-gray-700 font-semibold">Project Name*</label>
            <input 
              type="text" 
              name="projectName" 
              value={formData.projectName} 
              onChange={handleInputChange} 
              className="mt-1 p-2 block w-full border rounded-md"
              required 
            />
          </div>

          {/* Select Module */}
          <div>
            <label className="block text-gray-700 font-semibold">Select Module*</label>
            <select 
              name="module" 
              value={formData.module} 
              onChange={handleInputChange} 
              className="mt-1 p-2 block w-full border rounded-md">
              <option value="HR">HR</option>
              <option value="Employee">Employee</option>
              <option value="Project Manager">Project Manager</option>
            </select>
          </div>

          {/* Task Name */}
          <div>
            <label className="block text-gray-700 font-semibold">Task Name*</label>
            <input 
              type="text" 
              name="taskName" 
              value={formData.taskName} 
              onChange={handleInputChange} 
              className="mt-1 p-2 block w-full border rounded-md"
              required 
            />
          </div>

          {/* Assign, Actual Start Date, Actual Due Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">Assign*</label>
              <select 
                name="assignee" 
                value={formData.assignee} 
                onChange={handleInputChange} 
                className="mt-1 p-2 block w-full border rounded-md">
                <option value="Divya MN">Divya MN</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Actual Start Date*</label>
              <input 
                type="date" 
                name="startDate" 
                value={formData.startDate} 
                onChange={handleInputChange} 
                className="mt-1 p-2 block w-full border rounded-md"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Actual Due Date*</label>
              <input 
                type="date" 
                name="dueDate" 
                value={formData.dueDate} 
                onChange={handleInputChange} 
                className="mt-1 p-2 block w-full border rounded-md"
                required 
              />
            </div>
          </div>

          {/* Select Start Time, Select Due Time, Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">Select Start Time</label>
              <input 
                type="time" 
                name="startTime" 
                value={formData.startTime} 
                onChange={handleInputChange} 
                className="mt-1 p-2 block w-full border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Select Due Time</label>
              <input 
                type="time" 
                name="dueTime" 
                value={formData.dueTime} 
                onChange={handleInputChange} 
                className="mt-1 p-2 block w-full border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Type*</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleInputChange} 
                className="mt-1 p-2 block w-full border rounded-md">
                <option value="Bug">Bug</option>
                <option value="Task">Task</option>
                <option value="Improvement">Improvement</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              className="mt-1 p-2 block w-full border rounded-md resize-none"
              rows={5}
            ></textarea>
          </div>

          {/* Checklist */}
          <div>
            <label className="block text-gray-700 font-semibold">Checklist (Enter Numbers)</label>
            <input 
              type="number" 
              name="checklist" 
              value={formData.checklist} 
              onChange={handleInputChange} 
              className="mt-1 p-2 block w-full border rounded-md"
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-gray-700 font-semibold">Upload media (Max size 5MB)</label>
            <input 
              type="file" 
              name="attachment" 
              onChange={(e) => setFormData({ ...formData, attachment: e.target.files[0] })}
              className="mt-1 p-2 block w-full border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
