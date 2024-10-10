import React, { useState } from "react";
import { FiPlus, FiSearch, FiEye, FiCheck, FiX } from "react-icons/fi";

const initialLeavesData = [
  { id: 1, employeeName: "John Doe", leaveType: "Vacation", appliedOn: "2024-10-01", status: "Pending" },
  { id: 2, employeeName: "Jane Smith", leaveType: "Sick", appliedOn: "2024-10-02", status: "Approved" },
];

const ManageLeave = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaves, setLeaves] = useState(initialLeavesData);
  const [leaveType, setLeaveType] = useState("");
  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");
  const [reason, setReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredLeaves = leaves.filter(leave =>
    leave.employeeName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddLeave = (e) => {
    e.preventDefault();
    if (leaveType && leaveFrom && leaveTo && reason) {
      const newLeave = {
        id: leaves.length + 1,
        employeeName: "New Employee", // Replace with actual employee data
        leaveType,
        appliedOn: new Date().toISOString().split("T")[0],
        status: "Pending",
      };
      setLeaves([...leaves, newLeave]);
      resetForm();
    }
  };

  const resetForm = () => {
    setLeaveType("");
    setLeaveFrom("");
    setLeaveTo("");
    setReason("");
    setIsModalOpen(false);
  };

  const totalPages = Math.ceil(filteredLeaves.length / entries);
  const currentLeaves = filteredLeaves.slice((currentPage - 1) * entries, currentPage * entries);

  return (
    <div className="min-h-screen mt-4 flex flex-col bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Leave</h1>
        <button
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded shadow-md hover:opacity-90 flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus className="mr-2" /> Add Leave
        </button>
      </div>

      <div className="flex items-center border border-gray-300 rounded mb-4">
        <FiSearch className="text-gray-600 mr-2" />
        <input
          type="text"
          placeholder="Search by Employee Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-0 focus:ring-0 w-full"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-pink-600 text-white text-left text-sm font-medium">
              <th className="py-3 px-6">Sl.No</th>
              <th className="py-3 px-6">Employee Name</th>
              <th className="py-3 px-6">Leave Type</th>
              <th className="py-3 px-6">Applied On</th>
              <th className="py-3 px-6">Current Status</th>
              <th className="py-3 px-6 text-center">View</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentLeaves.map((leave, index) => (
              <tr key={leave.id} className="border-t border-gray-300">
                <td className="py-3 px-6">{(currentPage - 1) * entries + index + 1}</td>
                <td className="py-3 px-6">{leave.employeeName}</td>
                <td className="py-3 px-6">{leave.leaveType}</td>
                <td className="py-3 px-6">{leave.appliedOn}</td>
                <td className="py-3 px-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-white ${leave.status === 'Pending' ? 'bg-yellow-500' : leave.status === 'Approved' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {leave.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <button onClick={() => alert(`Viewing details for ${leave.employeeName}`)}>
                    <FiEye className="text-blue-500" />
                  </button>
                </td>
                <td className="py-3 px-6 text-center">
                  <button className="text-green-500">
                    <FiCheck />
                  </button>
                  <button className="text-red-500 ml-2">
                    <FiX />
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

      {/* Modal for Adding Leave */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative">
            <h2 className="text-xl font-semibold mb-4">Add Leave</h2>
            <form onSubmit={handleAddLeave}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Leave Type *</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="Vacation">Vacation</option>
                  <option value="Sick">Sick</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Leave From *</label>
                <input
                  type="date"
                  value={leaveFrom}
                  onChange={(e) => setLeaveFrom(e.target.value)}
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Leave To *</label>
                <input
                  type="date"
                  value={leaveTo}
                  onChange={(e) => setLeaveTo(e.target.value)}
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Describe your reason *</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={resetForm} className="mr-2 text-gray-600">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLeave;
