import React, { useState } from "react";
import { FiX, FiPlus } from "react-icons/fi";
import { FcSearch } from "react-icons/fc";
import { TiTrash } from "react-icons/ti";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const initialEventData = [
  { id: 1, title: "Team Building", date: "2024-10-10", time: "10:00 AM - 12:00 PM", mode: "In-Person", description: "Team bonding activities.", location: "Office" },
  { id: 2, title: "Project Launch", date: "2024-10-15", time: "3:00 PM - 5:00 PM", mode: "Online", description: "Launch event for new project.", location: "Zoom" },
];

const Event = () => {
  const [events, setEvents] = useState(initialEventData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("In-Person");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = events.filter(event => {
    const searchLower = search.toLowerCase();
    return (
      event.title.toLowerCase().includes(searchLower) ||
      event.date.includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.location.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredEvents.length / entries);
  const currentEvents = filteredEvents.slice((currentPage - 1) * entries, currentPage * entries);

  const handleAddEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title,
      date,
      time: `${startTime} - ${endTime}`,
      mode,
      description,
      location,
    };
    setEvents([...events, newEvent]);
    setTitle("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setMode("In-Person");
    setDescription("");
    setLocation("");
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="min-h-screen mt-4 flex flex-col bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-white shadow mb-4 rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Events</h1>
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
            placeholder="Search.."
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
              <th className="py-3 px-2 sm:px-6">Event Title</th>
              <th className="py-3 px-2 sm:px-6">Event Date</th>
              <th className="py-3 px-2 sm:px-6">Event Time</th>
              <th className="py-3 px-2 sm:px-6">Event Mode</th>
              <th className="py-3 px-2 sm:px-6">Event Description</th>
              <th className="py-3 px-2 sm:px-6">Event Location</th>
              <th className="py-3 px-2 sm:px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentEvents.length > 0 ? (
              currentEvents.map((event, index) => (
                <tr key={event.id} className="border-t border-gray-300">
                  <td className="py-3 px-2 sm:px-6">{(currentPage - 1) * entries + index + 1}</td>
                  <td className="py-3 px-2 sm:px-6">{event.title}</td>
                  <td className="py-3 px-2 sm:px-6">{event.date}</td>
                  <td className="py-3 px-2 sm:px-6">{event.time}</td>
                  <td className="py-3 px-2 sm:px-6">{event.mode}</td>
                  <td className="py-3 px-2 sm:px-6">{event.description}</td>
                  <td className="py-3 px-2 sm:px-6">{event.location}</td>
                  <td className="py-3 px-2 sm:px-6">
                    <button 
                      onClick={() => handleDeleteEvent(event.id)} 
                      className="text-red-500"
                    >
                      <TiTrash size={24} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-6 text-center text-gray-500">
                  No events found
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

        {/* New Event Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4 relative overflow-auto max-h-[90vh]">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2">
                <FiX className="h-5 w-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-semibold mb-4">New Event</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-600 mb-1">Event Title</label>
                  <input
                    type="text"
                    placeholder="Enter Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Event Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="In-Person">In-Person</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Event Description</label>
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  className="w-full h-38"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Event Location</label>
                <input
                  type="text"
                  placeholder="Enter Event Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={handleAddEvent}
                  className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                  Submit Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
