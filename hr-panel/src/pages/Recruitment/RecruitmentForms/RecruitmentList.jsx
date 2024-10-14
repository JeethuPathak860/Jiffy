import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { FcSearch } from "react-icons/fc";
import { MdLink, MdVisibility } from "react-icons/md"; // Import icons

const initialRequirementsData = [
  { id: 1, sender: "Alice", role: "Frontend Developer", experience: "3 years", resources: "Laptop", timeToHire: "2 weeks", status: "Open" },
  { id: 2, sender: "Charlie", role: "Backend Developer", experience: "5 years", resources: "Server", timeToHire: "3 weeks", status: "Closed" },
  // Add more initial data as needed
];

const RecruitmentList = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);

  const filteredRequirements = initialRequirementsData.filter(record => {
    const searchValue = search.toLowerCase();
    return (
      record.sender.toLowerCase().includes(searchValue) ||
      record.role.toLowerCase().includes(searchValue) ||
      record.experience.toLowerCase().includes(searchValue) ||
      record.resources.toLowerCase().includes(searchValue) ||
      record.timeToHire.toLowerCase().includes(searchValue) ||
      record.status.toLowerCase().includes(searchValue)
    );
  });

  const totalPages = Math.ceil(filteredRequirements.length / entries);
  const currentRequirements = filteredRequirements.slice((currentPage - 1) * entries, currentPage * entries);

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen mt-4 flex flex-col bg-gray-50">
      <div className="flex justify-between items-center p-6 bg-white shadow mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Requirements List</h1>
        <div className="flex items-center">
          <label className="mr-2 text-gray-600">Show</label>
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 w-32"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <div className="relative ml-4">
            <FcSearch className="absolute left-2 top-2" size={24} />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-10 py-2 w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex-grow p-6 overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-pink-600 text-white text-left text-sm font-medium">
              <th className="py-3 px-2 sm:px-6">SI.No</th>
              <th className="py-3 px-2 sm:px-6">Request Sender</th>
              <th className="py-3 px-2 sm:px-6">Required Role</th>
              <th className="py-3 px-2 sm:px-6">Required Experience</th>
              <th className="py-3 px-2 sm:px-6">Required Resources</th>
              <th className="py-3 px-2 sm:px-6">Time to Hire</th>
              <th className="py-3 px-2 sm:px-6">Status</th>
              <th className="py-3 px-2 sm:px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentRequirements.length > 0 ? (
              currentRequirements.map((record, index) => (
                <tr key={record.id} className="border-t border-gray-300">
                  <td className="py-3 px-2 sm:px-6">{(currentPage - 1) * entries + index + 1}</td>
                  <td className="py-3 px-2 sm:px-6">{record.sender}</td>
                  <td className="py-3 px-2 sm:px-6">{record.role}</td>
                  <td className="py-3 px-2 sm:px-6">{record.experience}</td>
                  <td className="py-3 px-2 sm:px-6">{record.resources}</td>
                  <td className="py-3 px-2 sm:px-6">{record.timeToHire}</td>
                  <td className="py-3 px-2 sm:px-6">{record.status}</td>
                  <td className="py-3 px-2 sm:px-6 flex space-x-4">
                    <button 
                      onClick={() => handleCopyLink("http://example.com/application-form")} 
                      className="flex items-center text-blue-500 hover:text-blue-700 p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition duration-200">
                      <MdLink className="text-xl" />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedRequirement(record);
                        setIsModalOpen(true);
                      }} 
                      className="flex items-center text-green-500 hover:text-green-700 p-2 rounded-full bg-green-100 hover:bg-green-200 transition duration-200">
                      <MdVisibility className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-6 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* View Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2">
                <FiX className="h-5 w-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-semibold mb-4">Job Details</h2>
              <p><strong>Role:</strong> {selectedRequirement?.role}</p>
              <p><strong>Sender:</strong> {selectedRequirement?.sender}</p>
              <p><strong>Experience:</strong> {selectedRequirement?.experience}</p>
              <p><strong>Resources:</strong> {selectedRequirement?.resources}</p>
              <p><strong>Time to Hire:</strong> {selectedRequirement?.timeToHire}</p>
              <p><strong>Status:</strong> {selectedRequirement?.status}</p>
              {/* Additional details can be added here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruitmentList;
