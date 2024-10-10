import React, { useState } from "react";
import { FiPlus, FiSearch, FiX, FiAlertCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const initialRolesData = [
  { id: 1, name: "Development" },
  { id: 2, name: "Accounts" },
  { id: 3, name: "Operations Management" },
  { id: 4, name: "Testing Engineering" },
  { id: 5, name: "HR" },
  { id: 6, name: "Marketing" },
  { id: 7, name: "Sales" },
  { id: 8, name: "IT Support" },
  { id: 9, name: "Legal" },
  { id: 10, name: "R&D" },
  { id: 11, name: "Product" },
  { id: 12, name: "Customer Service" },
];

const Roles = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roles, setRoles] = useState(initialRolesData);
  const [roleName, setRoleName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmationId, setConfirmationId] = useState(null);
  const [deletionInProgress, setDeletionInProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddRole = (e) => {
    e.preventDefault();
    if (roleName) {
      const newRole = {
        id: roles.length + 1,
        name: roleName,
      };
      setRoles([...roles, newRole]);
      setRoleName("");
      setIsModalOpen(false);
    }
  };

  const confirmDeleteRole = (id) => {
    setConfirmationId(id);
  };

  const handleDeleteRole = () => {
    setDeletionInProgress(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          setRoles((prev) => prev.filter(role => role.id !== confirmationId));
          setConfirmationId(null);
          setDeletionInProgress(false);
          return 100; // Ensure it's set to 100
        }
        return oldProgress + 20; // Increment progress
      });
    }, 100); // Simulate deletion time
  };

  const totalPages = Math.ceil(filteredRoles.length / entries);
  const currentRoles = filteredRoles.slice((currentPage - 1) * entries, currentPage * entries);

  return (
    <div className="min-h-screen mt-4 flex flex-col bg-gray-50">
      {/* Navbar */}
      <div className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-2xl font-semibold text-gray-800">Roles</h1>
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
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentRoles.map((role, index) => (
                <tr key={role.id} className="border-t border-gray-300">
                  <td className="py-3 px-6">{(currentPage - 1) * entries + index + 1}</td>
                  <td className="py-3 px-6">{role.name}</td>
                  <td className="py-3 px-6 text-center">
                    <button 
                      onClick={() => confirmDeleteRole(role.id)} 
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
                Are you sure you want to delete this role?
              </h2>
              <div className="flex justify-end">
                <button
                  onClick={handleDeleteRole}
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
              <h2 className="text-lg font-semibold mb-4">Deleting role...</h2>
              <div className="w-full bg-gray-200 rounded-full">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="mt-2 text-gray-600">{progress}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Adding Role */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2">
              <FiX className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Role</h2>
            <form onSubmit={handleAddRole}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Role *</label>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="Enter Role Name"
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded border border-blue-600 hover:bg-blue-700 transition duration-200"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded border border-gray-400 hover:bg-gray-400 transition duration-200 ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
