import React, { useState } from 'react';
import { FaEye, FaEdit } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { FcSearch } from 'react-icons/fc';

const SelectedCandidatesList = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const interviews = [
    {
      id: 1,
      name: 'Jane Smith',
      role: 'Frontend Developer',
      email: 'jane.smith@example.com',
      mobile: '9876543210',
      time: '10:00 AM',
      resumeLink: '/resumes/Human Resource.pdf',
    },
    // Add more dummy data as needed
  ];

  const filteredInterviews = interviews.filter(interview => {
    const searchValue = search.toLowerCase();
    return (
      interview.name.toLowerCase().includes(searchValue) ||
      interview.role.toLowerCase().includes(searchValue) ||
      interview.email.toLowerCase().includes(searchValue) ||
      interview.mobile.includes(searchValue) ||
      interview.time.toLowerCase().includes(searchValue)
    );
  });

  const totalPages = Math.ceil(filteredInterviews.length / entries);
  const currentInterviews = filteredInterviews.slice((currentPage - 1) * entries, currentPage * entries);

  const handleDownload = (resumeLink) => {
    window.open(resumeLink, '_blank');
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen mt-4 flex flex-col bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-white shadow mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Today’s Interviews</h1>
        <div className="flex items-center mt-4 md:mt-0">
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
              <th className="py-3 px-2 sm:px-6">Candidate Name</th>
              <th className="py-3 px-2 sm:px-6">Role</th>
              <th className="py-3 px-2 sm:px-6">Email ID</th>
              <th className="py-3 px-2 sm:px-6">Mobile No</th>
              <th className="py-3 px-2 sm:px-6">Time</th>
              <th className="py-3 px-2 sm:px-6">Resume</th>
              <th className="py-3 px-2 sm:px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentInterviews.length > 0 ? (
              currentInterviews.map((interview, index) => (
                <tr key={interview.id} className="border-t border-gray-300">
                  <td className="py-3 px-2 sm:px-6">{(currentPage - 1) * entries + index + 1}</td>
                  <td className="py-3 px-2 sm:px-6">{interview.name}</td>
                  <td className="py-3 px-2 sm:px-6">{interview.role}</td>
                  <td className="py-3 px-2 sm:px-6">{interview.email}</td>
                  <td className="py-3 px-2 sm:px-6">{interview.mobile}</td>
                  <td className="py-3 px-2 sm:px-6">{interview.time}</td>
                  <td className="py-3 px-2 sm:px-6">
                    <button onClick={() => handleDownload(interview.resumeLink)} className="text-blue-500">
                      <FaEye />
                    </button>
                  </td>
                  <td className="py-3 px-2 sm:px-6">
                    <button onClick={() => {
                      setSelectedInterview(interview);
                      setModalOpen(true);
                    }} className="text-green-500">
                      <FaEdit />
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

        {/* Update Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative">
              <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2">
                <FiX className="h-5 w-5 text-gray-600" />
              </button>
              <h3 className="text-lg font-semibold mb-4">Update Interview Status</h3>
              <form onSubmit={handleUpdate}>
                <label className="block mb-2">
                  Select Status:
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="block w-full mt-1 border border-gray-300 rounded-lg p-2"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-lg px-4 py-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="ml-2 bg-gray-300 text-gray-700 rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedCandidatesList;
