import React, { useState } from "react";
import { FiPlus, FiSearch, FiEye, FiCheck, FiX } from "react-icons/fi";

const initialLeavesData = [
  {
    id: 1,
    employeeName: "John Doe",
    leaveType: "Vacation",
    appliedOn: "2024-10-01",
    leaveDate: "2024-10-10",
    reason: "Family Vacation",
    status: "Pending",
  },
  {
    id: 2,
    employeeName: "Jane Smith",
    leaveType: "Sick",
    appliedOn: "2024-10-02",
    leaveDate: "2024-10-05",
    reason: "Fever and cold",
    status: "Approved",
  },
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
  const [selectedLeave, setSelectedLeave] = useState(null);

  const filteredLeaves = leaves.filter((leave) =>
    leave.employeeName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddLeave = (e) => {
    e.preventDefault();
    if (leaveType && leaveFrom && leaveTo && reason) {
      const newLeave = {
        id: leaves.length + 1,
        employeeName: "New Employee",
        leaveType,
        appliedOn: new Date().toISOString().split("T")[0],
        leaveDate: leaveTo,
        reason,
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
  const currentLeaves = filteredLeaves.slice(
    (currentPage - 1) * entries,
    currentPage * entries
  );

  const handleViewLeave = (leave) => {
    setSelectedLeave(leave);
  };

  const handleStatusChange = (leaveId, newStatus) => {
    setLeaves(
      leaves.map((leave) =>
        leave.id === leaveId ? { ...leave, status: newStatus } : leave
      )
    );
    if (selectedLeave && selectedLeave.id === leaveId) {
      setSelectedLeave({ ...selectedLeave, status: newStatus });
    }
  };

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
          className="border-0 focus:ring-0 w-full py-2 px-3"
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
              <th className="py-3 px-6">Leave Date</th>
              <th className="py-3 px-6">Current Status</th>
              <th className="py-3 px-6 text-center">View</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentLeaves.map((leave, index) => (
              <tr key={leave.id} className="border-t border-gray-300">
                <td className="py-3 px-6">
                  {(currentPage - 1) * entries + index + 1}
                </td>
                <td className="py-3 px-6">{leave.employeeName}</td>
                <td className="py-3 px-6">{leave.leaveType}</td>
                <td className="py-3 px-6">{leave.appliedOn}</td>
                <td className="py-3 px-6">{leave.leaveDate}</td>
                <td className="py-3 px-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white ${
                      leave.status === "Pending"
                        ? "bg-yellow-500"
                        : leave.status === "Approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <button onClick={() => handleViewLeave(leave)}>
                    <FiEye className="text-blue-500" />
                  </button>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="text-green-500"
                    onClick={() => handleStatusChange(leave.id, "Approved")}
                  >
                    <FiCheck />
                  </button>
                  <button
                    className="text-red-500 ml-2"
                    onClick={() => handleStatusChange(leave.id, "Rejected")}
                  >
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
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`bg-gray-300 text-gray-700 px-4 py-2 rounded border border-gray-400 hover:bg-gray-400 transition duration-200 ${
              currentPage === 1 ? "disabled:opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-2 text-gray-700">|</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className={`bg-gray-300 text-gray-700 px-4 py-2 rounded border border-gray-400 hover:bg-gray-400 transition duration-200 ${
              currentPage === totalPages
                ? "disabled:opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {/* Modal for Viewing Leave Details */}
      {selectedLeave && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedLeave(null)}
            >
              <FiX className="text-2xl" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              Leave Details
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-lg text-gray-700">
                    Employee ID:
                  </p>
                  <p className="text-lg text-gray-600">{`EMP-00${selectedLeave.id}`}</p>
                </div>
                <div>
                  <p className="font-medium text-lg text-gray-700">
                    Leave Type:
                  </p>
                  <p className="text-lg text-gray-600">
                    {selectedLeave.leaveType}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-lg text-gray-700">
                    Applied On:
                  </p>
                  <p className="text-lg text-gray-600">
                    {selectedLeave.appliedOn}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-lg text-gray-700">
                    Leave Date:
                  </p>
                  <p className="text-lg text-gray-600">
                    {selectedLeave.leaveDate}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="font-medium text-lg text-gray-700">Reason:</p>
                  <p className="text-lg text-gray-600 break-words">
                    {selectedLeave.reason}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-lg text-gray-700">Status:</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white ${
                      selectedLeave.status === "Pending"
                        ? "bg-yellow-500"
                        : selectedLeave.status === "Approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {selectedLeave.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
            </div>
          </div>
        </div>
      )}

      {/* Add Leave Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Leave</h2>
            <form onSubmit={handleAddLeave}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Leave Type</label>
                    <select
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Type</option>
                      <option value="Sick">Sick</option>
                      <option value="Vacation">Vacation</option>
                      <option value="Emergency">Emergency</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">From</label>
                    <input
                      type="date"
                      value={leaveFrom}
                      onChange={(e) => setLeaveFrom(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">To</label>
                    <input
                      type="date"
                      value={leaveTo}
                      onChange={(e) => setLeaveTo(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">Reason</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="4"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded shadow-md hover:opacity-90 w-full"
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

export default ManageLeave;
