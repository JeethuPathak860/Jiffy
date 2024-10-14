import React, { useState } from 'react';
import { FaEye, FaEdit } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { FcSearch } from 'react-icons/fc';

const ReceivedApplicationsList = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("shortlist"); // Added state for selected status

  const applications = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Software Engineer',
      email: 'john.doe@example.com',
      mobile: '1234567890',
      experience: '3 years',
      resumeLink: '/resumes/Human Resource.pdf',
    },
  ];

  const filteredApplications = applications.filter(app => {
    const searchValue = search.toLowerCase();
    return (
      app.name.toLowerCase().includes(searchValue) ||
      app.role.toLowerCase().includes(searchValue) ||
      app.email.toLowerCase().includes(searchValue) ||
      app.mobile.includes(searchValue) ||
      app.experience.toLowerCase().includes(searchValue)
    );
  });

  const totalPages = Math.ceil(filteredApplications.length / entries);
  const currentApplications = filteredApplications.slice((currentPage - 1) * entries, currentPage * entries);

  const handleDownload = (resumeLink) => {
    window.open(resumeLink, '_blank');
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log(`Updated ${selectedApplication.name} status to ${selectedStatus}`);
    setModalOpen(false);
    setSelectedStatus("shortlist"); // Reset to default status
    setSelectedApplication(null); // Clear selected application
  };

  return (
    <div className="min-h-screen mt-4 flex flex-col bg-gray-50">
      <div className="flex justify-between items-center p-6 bg-white shadow mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Received Applications List</h1>
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
              <th className="py-3 px-2 sm:px-6">Candidate Name</th>
              <th className="py-3 px-2 sm:px-6">Applied Role</th>
              <th className="py-3 px-2 sm:px-6">Email ID</th>
              <th className="py-3 px-2 sm:px-6">Mobile No</th>
              <th className="py-3 px-2 sm:px-6">Experience</th>
              <th className="py-3 px-2 sm:px-6">Resume</th>
              <th className="py-3 px-2 sm:px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentApplications.length > 0 ? (
              currentApplications.map((app, index) => (
                <tr key={app.id} className="border-t border-gray-300">
                  <td className="py-3 px-2 sm:px-6">{(currentPage - 1) * entries + index + 1}</td>
                  <td className="py-3 px-2 sm:px-6">{app.name}</td>
                  <td className="py-3 px-2 sm:px-6">{app.role}</td>
                  <td className="py-3 px-2 sm:px-6">{app.email}</td>
                  <td className="py-3 px-2 sm:px-6">{app.mobile}</td>
                  <td className="py-3 px-2 sm:px-6">{app.experience}</td>
                  <td className="py-3 px-2 sm:px-6">
                    <button onClick={() => handleDownload(app.resumeLink)} className="text-blue-500">
                      <FaEye />
                    </button>
                  </td>
                  <td className="py-3 px-2 sm:px-6">
                    <button onClick={() => {
                      setSelectedApplication(app);
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
              <h3 className="text-lg font-semibold mb-4">Update Candidate Status</h3>
              <form onSubmit={handleUpdate}>
                <label className="block mb-2">
                  Select Status:
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="block w-full mt-1 border border-gray-300 rounded-lg p-2"
                  >
                    <option value="shortlist">Shortlist</option>
                    <option value="reject">Reject</option>
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

export default ReceivedApplicationsList;
