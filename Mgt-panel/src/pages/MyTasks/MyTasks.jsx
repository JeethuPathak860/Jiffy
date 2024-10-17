import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa'; // Funnel icon
import ViewTaskDetails from './ViewTaskDetails'; // Adjust the path as necessary

const MyTask = () => {
  const [activeCard, setActiveCard] = useState('todo'); // Default is the To-Do Tasks card
  const [filteredType, setFilteredType] = useState(null); // For filter functionality
  const [selectedTask, setSelectedTask] = useState(null); // State to hold the selected task

  const handleCardClick = (cardName) => {
    setActiveCard(cardName);
  };

  const handleFilterChange = (type) => {
    setFilteredType(type);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task); // Set the selected task for viewing
  };

  const tasks = [
    {
      assignedBy: { name: "Guy Hawkins", avatar: "https://via.placeholder.com/50" },
      taskName: "Design the wireframe for Jiffy",
      projectName: "Jiffy",
      startDate: "12-02-24",
      endDate: "12-02-24",
      type: "Task",
      description: "Detailed description of the task goes here.",
    },
    {
      assignedBy: { name: "Jacob Jones", avatar: "https://via.placeholder.com/50" },
      taskName: "Employees panel bug found",
      projectName: "Aecp",
      startDate: "29-02-24",
      endDate: "29-02-24",
      type: "Bug",
      description: "Description of the bug found.",
      dateStarted: "28-02-24", // Additional field for in-progress tasks
    },
    {
      assignedBy: { name: "Cody Fisher", avatar: "https://via.placeholder.com/50" },
      taskName: "Develop the UI for employee panel",
      projectName: "Jiffy",
      startDate: "14-03-24",
      endDate: "14-03-24",
      type: "Task",
      description: "Description of UI development for the employee panel.",
    },
    {
      assignedBy: { name: "Ralph Edwards", avatar: "https://via.placeholder.com/50" },
      taskName: "PPT Completion",
      projectName: "AECearthHUB",
      startDate: "10-11-24",
      endDate: "10-11-24",
      type: "Task",
      description: "Completing the PowerPoint presentation.",
      dateStarted: "10-11-24", // Additional fields for completed tasks
      dateEnded: "10-12-24", // Additional field for completed tasks
      imageUrl: "https://via.placeholder.com/150", // Image URL for uploaded image
    },
  ];

  const filteredTasks = filteredType
    ? tasks.filter((task) => task.type === filteredType)
    : tasks;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Cards and Actions Section */}
      <div className="flex items-center justify-between mb-4 space-x-4">
        {/* To-Do Tasks Card */}
        <div
          className={`cursor-pointer p-4 w-[238px] h-[58px] bg-gray-600 text-white rounded-lg ${
            activeCard === 'todo' ? 'opacity-100' : 'opacity-75'
          }`}
          onClick={() => handleCardClick('todo')}
        >
          <h2 className="text-lg font-semibold text-center">To-Do Tasks</h2>
        </div>

        {/* In-progress Task Card */}
        <div
          className={`cursor-pointer p-4 w-[238px] h-[58px] bg-gray-600 text-white rounded-lg ${
            activeCard === 'inProgress' ? 'opacity-100' : 'opacity-75'
          }`}
          onClick={() => handleCardClick('inProgress')}
        >
          <h2 className="text-lg font-semibold text-center">In-progress Task</h2>
        </div>

        {/* Completed Tasks Card */}
        <div
          className={`cursor-pointer p-4 w-[238px] h-[58px] bg-gray-600 text-white rounded-lg ${
            activeCard === 'completed' ? 'opacity-100' : 'opacity-75'
          }`}
          onClick={() => handleCardClick('completed')}
        >
          <h2 className="text-lg font-semibold text-center">Completed Tasks</h2>
        </div>

        {/* Funnel (Filter) Icon */}
        <div className="w-[30px] h-[30px] bg-gray-400 rounded-full flex items-center justify-center cursor-pointer"
             onClick={() => handleFilterChange(filteredType === 'Bug' ? null : 'Bug')}  // Toggle filter for 'Bug' tasks
        >
          <FaFilter className="text-white" />
        </div>

        {/* Add Task Button */}
        <div className="p-4 w-[238px] h-[58px] bg-gray-800 text-white rounded-lg cursor-pointer">
          <h2 className="text-lg font-semibold text-center ">+ Add Task</h2>
        </div>
      </div>

      {/* Form or Task Details Section */}
      <div className="bg-gray-100 p-6 mt-4 rounded-lg">
        {selectedTask ? (
          <ViewTaskDetails 
            task={selectedTask}
            activeCard={activeCard} // Pass active card type
            onClose={() => setSelectedTask(null)} 
          />
        ) : (
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            {activeCard === 'todo' && 'To-Do Task'}
            {activeCard === 'inProgress' && 'In-progress Task'}
            {activeCard === 'completed' && 'Completed Task'}
          </h2>
        )}

        {/* Task List Table */}
        {!selectedTask && (
          <table className="w-full table-auto">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
              <tr>
                <th className="p-3">Assigned by</th>
                <th className="p-3">Task Name</th>
                <th className="p-3">Project Name</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">End Date</th>
                <th className="p-3">Type</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredTasks.map((task, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="p-3">{task.assignedBy.name}</td>
                  <td className="p-3">{task.taskName}</td>
                  <td className="p-3">{task.projectName}</td>
                  <td className="p-3">{task.startDate}</td>
                  <td className="p-3">{task.endDate}</td>
                  <td className="p-3">{task.type}</td>
                  <td className="p-3">
                    <button 
                      className="bg-gray-800 text-white py-1 px-3 rounded-lg"
                      onClick={() => handleViewTask(task)} // Trigger modal with task data
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyTask;
