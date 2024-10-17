import React from 'react';

const ViewTaskDetails = ({ task, activeCard, onClose }) => {
  const {
    projectName,
    type: taskType,
    assignedBy,
    startDate,
    endDate,
    description,
    dateStarted, // For in-progress and completed tasks
    dateEnded, // For completed tasks
    imageUrl, // For completed tasks to display uploaded image
  } = task;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto mt-8">
      {/* Header Section with Back Button and Title */}
      <div className="bg-gray-200 rounded-t-lg p-4 flex items-center justify-between">
        <button 
          className="text-gray-600 text-lg" 
          onClick={onClose} // Close button functionality
        >
          &larr; Back
        </button>
        <h2 className="text-lg font-semibold">Task: {task.taskName}</h2>
        <div className="w-16"></div> {/* Placeholder for balance */}
      </div>

      {/* Main Content Area with Task Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <p className="text-sm mb-2">
            <strong>Project Name:</strong> {projectName || 'N/A'}
          </p>
          <p className="text-sm mb-2">
            <strong>Assigned By:</strong> {assignedBy.name || 'N/A'}
          </p>
          <p className="text-sm mb-2">
            <strong>Start Date:</strong> {startDate || 'N/A'}
          </p>
          {taskType === 'In Progress' && (
            <p className="text-sm mb-2">
              <strong>Date Started:</strong> {dateStarted || 'N/A'}
            </p>
          )}
          {taskType === 'Completed' && (
            <>
              <p className="text-sm mb-2">
                <strong>Date Started:</strong> {dateStarted || 'N/A'}
              </p>
              <p className="text-sm mb-2">
                <strong>Date Ended:</strong> {dateEnded || 'N/A'}
              </p>
              <p className="text-sm mb-2">
                <strong>Uploaded Image:</strong>
                {imageUrl ? (
                  <img src={imageUrl} alt="Uploaded" className="mt-2 h-24 w-24 object-cover" />
                ) : (
                  <span className="text-gray-500">No image uploaded</span>
                )}
              </p>
            </>
          )}
        </div>

        {/* Right Column */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p>{description || 'No description available.'}</p>
        </div>
      </div>

      {/* Status Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Task Status</h3>
        <select className="border border-gray-300 rounded-lg p-2 w-full">
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>
    </div>
  );
};

export default ViewTaskDetails;
