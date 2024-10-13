import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
import { FcSearch } from "react-icons/fc";
import QRCode from 'react-qr-code'; // Import the QR code component
import * as XLSX from 'xlsx';

const initialAttendanceData = [
  { id: 1, employeeName: "Alice", date: "2024-10-01", timeIn: "09:00 AM", timeOut: "05:00 PM", status: "On Time", totalHours: "8" },
  { id: 2, employeeName: "Charlie", date: "2024-10-02", timeIn: "09:15 AM", timeOut: "05:00 PM", status: "Late", totalHours: "7.75" },
  // Add more initial data as needed
];

const Attendance = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [attendance, setAttendance] = useState(initialAttendanceData);
  const [month, setMonth] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAttendance = attendance.filter(record => {
    const { employeeName, date, status: recordStatus, totalHours } = record;
    const searchValue = search.toLowerCase();
    return (
      employeeName.toLowerCase().includes(searchValue) ||
      date.includes(search) ||
      recordStatus.toLowerCase().includes(searchValue) ||
      totalHours.includes(search)
    ) && (status === "All" || recordStatus === status) &&
      (selectedEmployee === "" || record.employeeName === selectedEmployee) &&
      (month === "" || new Date(record.date).toLocaleString('default', { month: 'long' }) === month);
  });

  const totalPages = Math.ceil(filteredAttendance.length / entries);
  const currentAttendance = filteredAttendance.slice((currentPage - 1) * entries, currentPage * entries);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(currentAttendance);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance Data");
    XLSX.writeFile(wb, "attendance_data.xlsx");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "On Time":
        return "text-green-500";
      case "Late":
        return "text-red-500";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="min-h-screen mt-4 flex flex-col bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-white shadow mb-4 ">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Attendance</h1>
        <div className="flex flex-wrap items-center space-x-2">
          <button
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-2 rounded shadow-md hover:opacity-90 flex items-center mb-2"
            onClick={() => setIsScannerModalOpen(true)}
          >
            <MdOutlineQrCodeScanner className="text-white" size={24} />
          </button>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-32 mb-2"
          >
            <option value="" disabled>Select Month</option>
            <option value="October">October</option>
            <option value="November">November</option>
          </select>

          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-32 mb-2"
          >
            <option value="" disabled>Select Employee</option>
            <option value="Alice">Alice</option>
            <option value="Charlie">Charlie</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-32 mb-2"
          >
            <option value="All">All</option>
            <option value="On Time">On Time</option>
            <option value="Late">Late</option>
          </select>

          <button 
            onClick={handleExportExcel}
            className="bg-green-600 text-white p-2 rounded border border-green-600 hover:bg-green-700 transition duration-200 flex items-center mb-2"
          >
            <PiMicrosoftExcelLogoBold className="text-white" size={24} />
          </button>
        </div>
      </div>

      <div className="flex-grow p-6 overflow-x-auto">
        <div className="flex justify-between items-center mb-4 flex-wrap">
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
              placeholder="Search by any field"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 focus:ring-0 pl-10 pr-2 w-full py-2 rounded"
            />
            <div className={`transition-all duration-300 ${search ? "bg-blue-200" : ""}`}></div>
          </div>
        </div>

        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-pink-600 text-white text-left text-sm font-medium">
              <th className="py-3 px-2 sm:px-6">Sl.No</th>
              <th className="py-3 px-2 sm:px-6">Employee Name</th>
              <th className="py-3 px-2 sm:px-6">Date</th>
              <th className="py-3 px-2 sm:px-6">Time In</th>
              <th className="py-3 px-2 sm:px-6">Time Out</th>
              <th className="py-3 px-2 sm:px-6">Status</th>
              <th className="py-3 px-2 sm:px-6">Total Hours</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentAttendance.length > 0 ? (
              currentAttendance.map((record, index) => (
                <tr key={record.id} className="border-t border-gray-300">
                  <td className="py-3 px-2 sm:px-6">{(currentPage - 1) * entries + index + 1}</td>
                  <td className="py-3 px-2 sm:px-6">{record.employeeName}</td>
                  <td className="py-3 px-2 sm:px-6">{record.date}</td>
                  <td className="py-3 px-2 sm:px-6">{record.timeIn}</td>
                  <td className="py-3 px-2 sm:px-6">{record.timeOut}</td>
                  <td className={`py-3 px-2 sm:px-6 ${getStatusClass(record.status)}`}>{record.status}</td>
                  <td className="py-3 px-2 sm:px-6">{record.totalHours}</td>
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

        {/* Scanner Modal */}
        {isScannerModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative">
              <button onClick={() => setIsScannerModalOpen(false)} className="absolute top-2 right-2">
                <FiX className="h-5 w-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-semibold mb-4">Scan QR to Login</h2>
              <div className="mb-4 flex justify-center">
                {/* QR Code Component */}
                <QRCode value="Your QR Code Value Here" size={128} />
              </div>
              <button
                onClick={() => { /* Export Data Logic */ }}
                className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
              >
                <MdOutlineQrCodeScanner className="text-white" size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
