import React, { useState } from "react";
import { FiX, FiPlus } from "react-icons/fi";
import { FcSearch } from "react-icons/fc";
import { TiTrash } from "react-icons/ti";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const initialAnnouncementData = [
  { id: 1, title: "Team Meeting", description: "Meeting at 10 AM", date: "2024-10-01" },
  { id: 2, title: "Project Deadline", description: "Deadline is next Friday", date: "2024-10-05" },
  // Additional initial data for testing
];

const Announcement = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncementData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter announcements based on title, description, and date
  const filteredAnnouncements = announcements.filter(announcement => {
    const searchLower = search.toLowerCase();
    return (
      announcement.title.toLowerCase().includes(searchLower) ||
      announcement.description.toLowerCase().includes(searchLower) ||
      announcement.date.includes(searchLower) // Date filtering
    );
  });

  const totalPages = Math.ceil(filteredAnnouncements.length / entries);
  const currentAnnouncements = filteredAnnouncements.slice((currentPage - 1) * entries, currentPage * entries);

  const handleAddAnnouncement = () => {
    const newAnnouncement = {
      id: announcements.length + 1,
      title,
      description,
      date: new Date().toLocaleDateString(),
    };
    setAnnouncements([...announcements, newAnnouncement]);
    setTitle("");
    setDescription("");
    setIsModalOpen(false);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  };

  return (
    <div className="min-h-screen mt-4 flex flex-col bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-white shadow mb-4 rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Announcements</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-2 rounded shadow-md hover:opacity-90 flex items-center"
          >
            <FiPlus className="text-white" size={24} />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 flex-wrap px-6">
        <div className="flex items-center mb-2 sm:mb-0">
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
          <span className="ml-2 text-gray-600">entries</span>
        </div>
        <div className="flex items-center border border-gray-300 rounded mb-2 sm:mb-0 w-full sm:w-auto relative">
          <FcSearch className="text-gray-600 absolute left-2" size={24} />
          <input
            type="text"
            placeholder="Search by title, description, or date"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 focus:ring-0 pl-10 pr-2 w-full py-2 rounded"
          />
        </div>
      </div>

      <div className="flex-grow p-6 overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-pink-600 text-white text-left text-sm font-medium">
              <th className="py-3 px-2 sm:px-6">Sl.No</th>
              <th className="py-3 px-2 sm:px-6">Title</th>
              <th className="py-3 px-2 sm:px-6">Description</th>
              <th className="py-3 px-2 sm:px-6">Announcement Date</th>
              <th className="py-3 px-2 sm:px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentAnnouncements.length > 0 ? (
              currentAnnouncements.map((announcement, index) => (
                <tr key={announcement.id} className="border-t border-gray-300">
                  <td className="py-3 px-2 sm:px-6">{(currentPage - 1) * entries + index + 1}</td>
                  <td className="py-3 px-2 sm:px-6">{announcement.title}</td>
                  <td className="py-3 px-2 sm:px-6">{announcement.description}</td>
                  <td className="py-3 px-2 sm:px-6">{announcement.date}</td>
                  <td className="py-3 px-2 sm:px-6">
                    <button 
                      onClick={() => handleDeleteAnnouncement(announcement.id)} 
                      className="text-red-500"
                    >
                      <TiTrash size={24} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No announcements found
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

        {/* New Announcement Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2">
                <FiX className="h-5 w-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-semibold mb-4">New Announcement</h2>
              <input
                type="text"
                placeholder="Announcement Title*"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                required
              />
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Announcement Description*"
              />
              <button
                onClick={handleAddAnnouncement}
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
              >
                Add Announcement
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
