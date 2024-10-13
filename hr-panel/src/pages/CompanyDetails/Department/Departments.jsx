import React, { useState, useRef } from "react";
import { FiPlus, FiSearch, FiFile, FiX, FiAlertCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md"; // New trash icon from Material Design icons

const initialDepartmentsData = [
  { id: 1, name: "Development", logo: "https://via.placeholder.com/40" },
  { id: 2, name: "Accounts", logo: "https://via.placeholder.com/40" },
  { id: 3, name: "Operations Management", logo: "https://via.placeholder.com/40" },
  { id: 4, name: "Testing Engineering", logo: "https://via.placeholder.com/40" },
  { id: 5, name: "HR", logo: "https://via.placeholder.com/40" },
  { id: 6, name: "Marketing", logo: "https://via.placeholder.com/40" },
  { id: 7, name: "Sales", logo: "https://via.placeholder.com/40" },
  { id: 8, name: "IT Support", logo: "https://via.placeholder.com/40" },
  { id: 9, name: "Legal", logo: "https://via.placeholder.com/40" },
  { id: 10, name: "R&D", logo: "https://via.placeholder.com/40" },
  { id: 11, name: "Product", logo: "https://via.placeholder.com/40" },
  { id: 12, name: "Customer Service", logo: "https://via.placeholder.com/40" },
];

const Departments = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments, setDepartments] = useState(initialDepartmentsData);
  const [departmentName, setDepartmentName] = useState("");
  const [departmentLogo, setDepartmentLogo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmationId, setConfirmationId] = useState(null);
  const [deletionInProgress, setDeletionInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (departmentName && departmentLogo) {
      const newDept = {
        id: departments.length + 1,
        name: departmentName,
        logo: URL.createObjectURL(departmentLogo),
      };
      setDepartments([...departments, newDept]);
      setDepartmentName("");
      setDepartmentLogo(null);
      setIsModalOpen(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const confirmDeleteDepartment = (id) => {
    setConfirmationId(id);
  };

  const handleDeleteDepartment = () => {
    setDeletionInProgress(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          setDepartments((prev) => prev.filter(dept => dept.id !== confirmationId));
          setConfirmationId(null);
          setDeletionInProgress(false);
          return 100; // Ensure it's set to 100
        }
        return oldProgress + 20; // Increment progress
      });
    }, 100); // Simulate deletion time
  };

  const totalPages = Math.ceil(filteredDepartments.length / entries);
  const currentDepartments = filteredDepartments.slice((currentPage - 1) * entries, currentPage * entries);

  return (
    <div className="min-h-screen mt-4 flex boarder-rounded flex-col bg-gray-50">
      {/* Navbar */}
      <div className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-2xl font-semibold text-gray-800">Departments</h1>
        <button
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded shadow-md hover:opacity-90 flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus className="mr-2" /> Add
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label className="mr-2 text-gray-600">Show</label>
            <select
              value={entries}
              onChange={(e) => setEntries(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="ml-2 text-gray-600">entries</span>
          </div>
          <div className="flex items-center border border-gray-300 rounded px-2">
            <FiSearch className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 focus:ring-0 w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-pink-600 text-white text-left text-sm font-medium">
                <th className="py-3 px-6">Sl.No</th>
                <th className="py-3 px-6">Department Name</th>
                <th className="py-3 px-6">Department Logo</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentDepartments.map((dept, index) => (
                <tr key={dept.id} className="border-t border-gray-300">
                  <td className="py-3 px-6">{(currentPage - 1) * entries + index + 1}</td>
                  <td className="py-3 px-6">{dept.name}</td>
                  <td className="py-3 px-6">
                    <img
                      src={dept.logo}
                      alt={dept.name}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button 
                      onClick={() => confirmDeleteDepartment(dept.id)} 
                      className={`bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-200`}
                    >
                      <MdDelete className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
          </div>
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={`bg-gray-300 text-gray-700 px-4 py-2 rounded border border-gray-400 hover:bg-gray-400 transition duration-200 ${currentPage === 1 ? 'disabled:opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-2 text-gray-700">|</span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className={`bg-gray-300 text-gray-700 px-4 py-2 rounded border border-gray-400 hover:bg-gray-400 transition duration-200 ${currentPage === totalPages ? 'disabled:opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* Confirmation Modal for Deletion */}
        {confirmationId && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiAlertCircle className="text-yellow-500 mr-2" />
                Are you sure you want to delete this department?
              </h2>
              <div className="flex justify-end">
                <button
                  onClick={handleDeleteDepartment}
                  className="bg-red-600 text-white px-4 py-2 rounded border border-red-600 hover:bg-red-700 transition duration-200"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setConfirmationId(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded border border-gray-400 hover:bg-gray-400 transition duration-200 ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Deletion In Progress Message */}
        {deletionInProgress && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 text-center">
              <h2 className="text-lg font-semibold mb-4">Deleting department...</h2>
              <div className="w-full bg-gray-200 rounded-full">
                <div
                  className={`bg-green-600 h-2 rounded-full transition-all`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="mt-2 text-gray-600">{progress}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Adding Department */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2">
              <FiX className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Department</h2>
            <form onSubmit={handleAddDepartment}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Department Name *</label>
                <input
                  type="text"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  placeholder="Enter Department Name"
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <label className="block text-gray-700 mb-1">Department Logo *</label>
              <div className="mb-4 relative border border-gray-300 rounded">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => setDepartmentLogo(e.target.files[0])}
                  className="border border-gray-300 rounded w-full px-3 py-2 hidden"
                  accept="image/*"
                  required
                />
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white py-1 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm"
                >
                  Browse
                </button>
                <span className={`block text-gray-600 mt-1 p-2 ${departmentLogo ? "bg-gray-100" : "bg-white"}`}>
                  {departmentLogo ? departmentLogo.name : "Choose file"}
                </span>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded border border-blue-600 hover:bg-blue-700 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
