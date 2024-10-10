import React, { useState } from "react";
import { FiSearch, FiX, FiAlertCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const initialIssuesData = [
  { id: 1, senderName: "Alice", sendTo: "Bob", requestType: "Bug", currentStatus: "Open", ticketId: "TKT-001" },
  { id: 2, senderName: "Charlie", sendTo: "Dave", requestType: "Feature", currentStatus: "In Progress", ticketId: "TKT-002" },
];

const IssueTracking = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issues, setIssues] = useState(initialIssuesData);
  const [requestType, setRequestType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmationId, setConfirmationId] = useState(null);
  const [deletionInProgress, setDeletionInProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const filteredIssues = issues.filter(issue => {
    const { senderName, sendTo, requestType, currentStatus, ticketId } = issue;
    return (
      senderName.toLowerCase().includes(search.toLowerCase()) ||
      sendTo.toLowerCase().includes(search.toLowerCase()) ||
      requestType.toLowerCase().includes(search.toLowerCase()) ||
      currentStatus.toLowerCase().includes(search.toLowerCase()) ||
      ticketId.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleAddIssue = (e) => {
    e.preventDefault();
    if (requestType) {
      const newIssue = {
        id: issues.length + 1,
        senderName: "New Sender",
        sendTo: "New Recipient",
        requestType: requestType,
        currentStatus: "New",
        ticketId: `TKT-00${issues.length + 1}`
      };
      setIssues([...issues, newIssue]);
      setRequestType("");
      setIsModalOpen(false);
    }
  };

  const confirmDeleteIssue = (id) => {
    setConfirmationId(id);
  };

  const handleDeleteIssue = () => {
    setDeletionInProgress(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          setIssues((prev) => prev.filter(issue => issue.id !== confirmationId));
          setConfirmationId(null);
          setDeletionInProgress(false);
          return 100;
        }
        return oldProgress + 20;
      });
    }, 100);
  };

  const totalPages = Math.ceil(filteredIssues.length / entries);
  const currentIssues = filteredIssues.slice((currentPage - 1) * entries, currentPage * entries);

  return (
    <div className="min-h-screen mt-4 flex flex-col bg-gray-50">
      <div className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-2xl font-semibold text-gray-800">Issue Tracking</h1>
        <button
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded shadow-md hover:opacity-90 flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          Request
        </button>
      </div>

      <div className="flex-grow p-6">
        <div className="flex justify-between items-center mb-4 flex-wrap">
          <div className="flex items-center mb-2 sm:mb-0">
            <label className="mr-2 text-gray-600">Show</label>
            <select
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="ml-2 text-gray-600">entries</span>
          </div>
          <div className="flex items-center border border-gray-300 rounded px-2 mb-2 sm:mb-0">
            <FiSearch className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search by any field"
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
                <th className="py-3 px-2 sm:px-6">Sl.No</th>
                <th className="py-3 px-2 sm:px-6">Sender Name</th>
                <th className="py-3 px-2 sm:px-6">Send To</th>
                <th className="py-3 px-2 sm:px-6">Request Type</th>
                <th className="py-3 px-2 sm:px-6">Current Status</th>
                <th className="py-3 px-2 sm:px-6">Ticket Id</th>
                <th className="py-3 px-2 sm:px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentIssues.length > 0 ? (
                currentIssues.map((issue, index) => (
                  <tr key={issue.id} className="border-t border-gray-300">
                    <td className="py-3 px-2 sm:px-6">{(currentPage - 1) * entries + index + 1}</td>
                    <td className="py-3 px-2 sm:px-6">{issue.senderName}</td>
                    <td className="py-3 px-2 sm:px-6">{issue.sendTo}</td>
                    <td className="py-3 px-2 sm:px-6">{issue.requestType}</td>
                    <td className="py-3 px-2 sm:px-6">{issue.currentStatus}</td>
                    <td className="py-3 px-2 sm:px-6">{issue.ticketId}</td>
                    <td className="py-3 px-2 sm:px-6 text-center">
                      <button 
                        onClick={() => confirmDeleteIssue(issue.id)} 
                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-200"
                      >
                        <MdDelete className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 flex-wrap">
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

        {confirmationId && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiAlertCircle className="text-yellow-500 mr-2" />
                Are you sure you want to delete this issue?
              </h2>
              <div className="flex justify-end">
                <button
                  onClick={handleDeleteIssue}
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

        {deletionInProgress && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 text-center">
              <h2 className="text-lg font-semibold mb-4">Deleting issue...</h2>
              <div className="w-full bg-gray-200 rounded-full">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="mt-2 text-gray-600">{progress}%</span>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2">
              <FiX className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold mb-4">New Request</h2>
            <form onSubmit={handleAddIssue}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Request Type *</label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="" disabled>Nothing Selected</option>
                  <option value="Bug">Bug</option>
                  <option value="Feature">Feature</option>
                  <option value="Improvement">Improvement</option>
                </select>
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

export default IssueTracking;
