import React, { useState, useRef } from "react";
import { FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";

const initialReportData = [
  { id: 1, projectName: "Project Alpha", task: "Design", startDate: "2024-10-01", endDate: "2024-10-05", duration: "4 days" },
  { id: 2, projectName: "Project Beta", task: "Development", startDate: "2024-10-06", endDate: "2024-10-10", duration: "4 days" },
];

const MonthlyReport = () => {
  const [reports, setReports] = useState(initialReportData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employee, setEmployee] = useState("");
  const [team, setTeam] = useState("");
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const reportRef = useRef();

  const filteredReports = reports.filter(report => {
    const searchLower = search.toLowerCase();
    return (
      report.projectName.toLowerCase().includes(searchLower) ||
      report.task.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredReports.length / entries);
  const currentReports = filteredReports.slice((currentPage - 1) * entries, currentPage * entries);

  const handleDownload = () => {
    const doc = new jsPDF();
    const tableColumn = ["SL.No", "Project Name", "Task", "Start Date", "End Date", "Task Duration"];
    const tableRows = [];

    currentReports.forEach((report, index) => {
      const reportData = [
        (currentPage - 1) * entries + index + 1,
        report.projectName,
        report.task,
        report.startDate,
        report.endDate,
        report.duration,
      ];
      tableRows.push(reportData);
    });

    doc.setFontSize(18);
    doc.text("Monthly Report", 14, 22);
    doc.setFontSize(12);
    doc.text(`Period: ${startDate} to ${endDate}`, 14, 30);
    doc.setFontSize(10);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 36);
    doc.line(10, 40, 200, 40);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: "grid",
      headStyles: { fillColor: [255, 105, 180], textColor: [255, 255, 255], fontSize: 10 },
      styles: { cellPadding: 5, fontSize: 10 },
    });

    doc.save("monthly_report.pdf");
  };

  return (
    <div className="min-h-screen mt-4 flex flex-col bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-white shadow mb-4 rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Time Sheet</h1>
        <button
          onClick={handleDownload}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-2 rounded shadow-md hover:opacity-90 flex items-center"
        >
          <FiDownload className="text-white" size={24} />
          <span className="ml-2">Download</span>
        </button>
      </div>

      <div className="text-center text-blue-600 text-2xl font-semibold mb-4">MONTH REPORT</div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 px-6">
        <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0 w-full">
          <div className="mr-4 mb-4 sm:mb-0">
            <label className="mr-2 text-gray-600">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mr-4 mb-4 sm:mb-0">
            <label className="mr-2 text-gray-600">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-0 w-full">
          <div className="mr-4 mb-4 sm:mb-0">
            <label className="mr-2 text-gray-600">Employee:</label>
            <select
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Employee</option>
              <option value="Employee 1">Employee 1</option>
              <option value="Employee 2">Employee 2</option>
            </select>
          </div>

          <div className="mr-4 mb-4 sm:mb-0">
            <label className="mr-2 text-gray-600">Team:</label>
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Team</option>
              <option value="Team A">Team A</option>
              <option value="Team B">Team B</option>
            </select>
          </div>
        </div>
      </div>

      <div ref={reportRef} className="flex-grow p-6 overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-pink-600 text-white text-left text-sm font-medium">
              <th className="py-3 px-2 sm:px-6">SL.No</th>
              <th className="py-3 px-2 sm:px-6">Project Name</th>
              <th className="py-3 px-2 sm:px-6">Task</th>
              <th className="py-3 px-2 sm:px-6">Start Date</th>
              <th className="py-3 px-2 sm:px-6">End Date</th>
              <th className="py-3 px-2 sm:px-6">Task Duration</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentReports.length > 0 ? (
              currentReports.map((report, index) => (
                <tr key={report.id} className="border-t border-gray-300">
                  <td className="py-3 px-2 sm:px-6">{(currentPage - 1) * entries + index + 1}</td>
                  <td className="py-3 px-2 sm:px-6">{report.projectName}</td>
                  <td className="py-3 px-2 sm:px-6">{report.task}</td>
                  <td className="py-3 px-2 sm:px-6">{report.startDate}</td>
                  <td className="py-3 px-2 sm:px-6">{report.endDate}</td>
                  <td className="py-3 px-2 sm:px-6">{report.duration}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500">
                  No reports found
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
      </div>
    </div>
  );
};

export default MonthlyReport;
