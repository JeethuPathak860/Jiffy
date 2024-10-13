import React, { useState } from "react";
import { FiPlus, FiSearch, FiX, FiAlertCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const initialHolidaysData = [
  { id: 1, name: "New Year's Day", range: "2023-01-01 to 2023-01-01", daysHours: "1 Day" },
  { id: 2, name: "Christmas", range: "2023-12-25 to 2023-12-25", daysHours: "1 Day" },
  // Add more initial holidays as needed
];

const HolidayByPolicy = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [holidays, setHolidays] = useState(initialHolidaysData);
  const [holidayName, setHolidayName] = useState("");
  const [leaveRange, setLeaveRange] = useState("");
  const [daysHours, setDaysHours] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmationId, setConfirmationId] = useState(null);

  const filteredHolidays = holidays.filter(holiday =>
    holiday.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddHoliday = (e) => {
    e.preventDefault();
    if (holidayName && leaveRange && daysHours) {
      const newHoliday = {
        id: holidays.length + 1,
        name: holidayName,
        range: leaveRange,
        daysHours: daysHours,
      };
      setHolidays([...holidays, newHoliday]);
      setHolidayName("");
      setLeaveRange("");
      setDaysHours("");
      setIsModalOpen(false);
    }
  };

  const confirmDeleteHoliday = (id) => {
    setConfirmationId(id);
  };

  const handleDeleteHoliday = () => {
    setHolidays((prev) => prev.filter(holiday => holiday.id !== confirmationId));
    setConfirmationId(null);
  };

  const totalPages = Math.ceil(filteredHolidays.length / entries);
  const currentHolidays = filteredHolidays.slice((currentPage - 1) * entries, currentPage * entries);

  return (
    <div className="min-h-screen mt-4 flex flex-col bg-gray-50">
      <div className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-2xl font-semibold text-gray-800">Holiday List</h1>
        <button
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded shadow-md hover:opacity-90 flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus className="mr-2" /> Add Holiday
        </button>
      </div>

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
                <th className="py-3 px-6">Holiday Name</th>
                <th className="py-3 px-6">Leave Range</th>
                <th className="py-3 px-6">Days/Hours</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentHolidays.map((holiday, index) => (
                <tr key={holiday.id} className="border-t border-gray-300">
                  <td className="py-3 px-6">{(currentPage - 1) * entries + index + 1}</td>
                  <td className="py-3 px-6">{holiday.name}</td>
                  <td className="py-3 px-6">{holiday.range}</td>
                  <td className="py-3 px-6">{holiday.daysHours}</td>
                  <td className="py-3 px-6 text-center">
                    <button 
                      onClick={() => confirmDeleteHoliday(holiday.id)} 
                      className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-200"
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
                Are you sure you want to delete this holiday?
              </h2>
              <div className="flex justify-end">
                <button
                  onClick={handleDeleteHoliday}
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

        {/* Modal for Adding Holiday */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2">
                <FiX className="h-5 w-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-semibold mb-4">Add Holiday</h2>
              <form onSubmit={handleAddHoliday}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Holiday Name *</label>
                  <input
                    type="text"
                    value={holidayName}
                    onChange={(e) => setHolidayName(e.target.value)}
                    placeholder="Enter Holiday Name"
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Leave Range *</label>
                  <input
                    type="text"
                    value={leaveRange}
                    onChange={(e) => setLeaveRange(e.target.value)}
                    placeholder="e.g. 2023-12-25 to 2023-12-25"
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Days/Hours *</label>
                  <input
                    type="text"
                    value={daysHours}
                    onChange={(e) => setDaysHours(e.target.value)}
                    placeholder="e.g. 1 Day"
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
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
    </div>
  );
};

export default HolidayByPolicy;
